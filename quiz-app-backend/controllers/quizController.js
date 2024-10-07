const db = require('../models/db');

// Get all quiz questions
exports.getAllQuestionSets = (req, res) => {
  const query = 'SELECT * FROM question_sets';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch question_sets' });
    } else {
      res.json(results);
    }
  });
};

// Get all quiz questions
exports.getQuestionSetById = (req, res) => {
  try {
    const questionSetId = req.params.id;
    
    const query = `
      SELECT 
        qs.title, 
        qs.timer, 
        q.*
      FROM 
        question_sets qs 
      JOIN 
        questions q ON qs.id = q.question_set_id 
      WHERE 
        qs.id = ?
    `;

    db.query(query, [questionSetId], (err, results) => {

      if (results.length === 0) {
        return res.status(404).json({ error: 'Question set not found' });
      }

      const { title, timer } = results[0];
      const questions = results.map(question => ({
        ...question,
        options: question.options,
        correct_answer: question.correct_answer
      }));

      res.json({ title, timer, questions });
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions for the question set' });
  }
};

// Submit quiz answers and calculate score
exports.submitQuiz = (req, res) => {
  try {
    const questionSetId = req.params.id;
    const { answers } = req.body; // 'answers' is an object with question IDs as keys

    let score = 0;

    const query = `
      SELECT id, correct_answer, points, type
      FROM questions
      WHERE question_set_id = ?
    `;

    db.query(query, [questionSetId], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Failed to fetch questions' });
      }

      const totalPoints = results.reduce((sum, question) => sum + question.points, 0); // Calculate total points

      const correctAnswers = results.reduce((acc, question) => {
        acc[question.id] = {
          correctAnswer: question.correct_answer, // This should be an array
          points: question.points,
          type: question.type, // 'single' or 'multiple'
        };
        return acc;
      }, {});

      // Iterate over the answers object using Object.entries()
      Object.entries(answers).forEach(([questionId, userAnswer]) => {
        // console.log(correctAnswers, 'sasd');
        console.log(questionId, 'sasda');
        const correctAnswerData = correctAnswers[questionId];
        if (!correctAnswerData) {
          console.error(`No correct answer found for questionId ${questionId}`);
          return;
        }
        const correctAnswer = correctAnswerData.correctAnswer; // This is an array
        const points = correctAnswerData.points;
        const questionType = correctAnswerData.type;

        let isCorrect = false;

        if (questionType === 'multiple') {
          // For multiple-choice questions, compare arrays
          if (Array.isArray(userAnswer)) {
            // Sort both arrays for comparison
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...correctAnswer].sort();

            isCorrect =
              sortedUserAnswer.length === sortedCorrectAnswer.length &&
              sortedUserAnswer.every((val, index) => val === sortedCorrectAnswer[index]);
          } else {
            console.error(`Expected an array for questionId ${questionId}, but got:`, userAnswer);
          }
        } else {
          // For single-choice questions, compare strings
          if (typeof userAnswer === 'string') {
            isCorrect = correctAnswer.includes(userAnswer);
          } else {
            console.error(`Expected a string for questionId ${questionId}, but got:`, userAnswer);
          }
        }

        if (isCorrect) {
          score += points; // Add points for correct answer
        }
      });

      const percentage = (score / totalPoints) * 100; // Calculate percentage

      const insertResultQuery = `
        INSERT INTO results (user_id, question_set_id, score, percentage)
        VALUES (?, ?, ?, ?)
      `;
      db.query(insertResultQuery, [1, questionSetId, score, percentage], (err, result) => {
        if (err) {
          console.error('Database insert error:', err);
          return res.status(500).json({ error: 'Failed to save results' });
        }

        // Send final score and percentage to the user
        res.json({ score, percentage });
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
};




exports.saveJSONQuestion = (req, res) => {
  const { title, timer, questions } = req.body;

  // Insert into question_sets table
  const insertQuestionSetQuery = `
    INSERT INTO question_sets (title, timer)
    VALUES (?, ?)
  `;

  db.query(insertQuestionSetQuery, [title, timer], (err, result) => {
    if (err) {
      console.error('Error saving question set:', err);
      return res.status(500).json({ error: 'Failed to save question set' });
    }

    const questionSetId = result.insertId; // Get the ID of the newly inserted question set

    // Prepare query for inserting questions
    const insertQuestionQuery = `
      INSERT INTO questions (question_set_id, question_text, options, correct_answer, type, points)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Insert each question related to the question set
    questions.forEach((question, index) => {
      try {
        const optionsJSON = JSON.stringify(question.options);
        const correctAnswerJSON = JSON.stringify(question.correctAnswer);

        db.query(insertQuestionQuery, [
          questionSetId,
          question.questionText,
          optionsJSON,
          correctAnswerJSON,
          question.type,
          question.points
        ], (err, result) => {
          if (err) {
            console.error(`Error saving question at index ${index}:`, err);
            return res.status(500).json({ error: 'Failed to save question' });
          }
        });
      } catch (jsonError) {
        console.error(`JSON parsing error at index ${index}:`, jsonError);
        return res.status(400).json({ error: `Invalid JSON format at question index ${index}` });
      }
    });

    // After all questions are inserted, send a success response
    res.json({ message: 'Question set and questions saved successfully' });
  });
};

// Get all quiz questions
exports.getResultsById = (req, res) => {
  const questionSetId = req.params.id;
  const query = 'SELECT * FROM results WHERE question_set_id =  ?';
  
  db.query(query, [questionSetId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch question_sets' });
    } else {
      res.json(results);
    }
  });
};
