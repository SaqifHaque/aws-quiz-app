import React, { useState, useEffect, useCallback } from 'react';
import { getQuestionSetById, submitAnswers } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const ExamPage = () => {
  const { id } = useParams(); // Get question set ID from URL
  const navigate = useNavigate(); // Replaces useHistory in React Router v6
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(1);
  const [title, setTitle] = useState("Exam")
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timer * 60);

  useEffect(() => {
    const fetchQuestionSet = async () => {
      const response = await getQuestionSetById(id);
      console.log(response, 'sas');
      setQuestions(response.questions);
      setTimer(response.timer);
      setTitle(response.title);
      setTimeLeft(response.timer * 60);
    };
    fetchQuestionSet();
  }, [id]);

  const handleSubmit = async () => {
    try {
      console.log(answers, 'aer');
      const result = await submitAnswers(id, answers); // Call API to submit answers
      navigate(`/result/${id}`, {
        state: {
          score: result.score,
          percentage: result.percentage,
          title: title, // Assuming 'title' is available in this component
        },
      }); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(timerInterval);
        handleSubmit();
      }
    }, 1000);
  
    return () => clearInterval(timerInterval);
  }, [timeLeft, handleSubmit]);

  const handleAnswerChange = useCallback(
    (questionId, selectedOption, questionType, checked) => {
      setAnswers((prevAnswers) => {
        const prevAnswer = prevAnswers[questionId] || (questionType === 'multiple' ? [] : '');
        if (questionType === 'multiple') {
          // For multiple-choice questions
          let updatedAnswers;
          if (checked) {
            // Add the selected option
            updatedAnswers = [...prevAnswer, selectedOption];
          } else {
            // Remove the unselected option
            updatedAnswers = prevAnswer.filter((option) => option !== selectedOption);
          }
          return {
            ...prevAnswers,
            [questionId]: updatedAnswers,
          };
        } else {
          // For single-choice questions
          return {
            ...prevAnswers,
            [questionId]: selectedOption,
          };
        }
      });
    },
    [setAnswers]
  );
  

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600">{ title }</h3>
      <p className="text-lg font-semibold text-red-500 mb-6">
        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
      </p>
      
      <form>
      {questions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <h4 className="text-xl font-medium mb-2 text-gray-800">
              {index + 1}. {q.question_text}
            </h4>
            {q.options.map((option) => {
              const isChecked =
                q.type === 'multiple'
                  ? answers[q.id]?.includes(option)
                  : answers[q.id] === option;
              return (
                <label key={option} className="block mb-2">
                  <input
                    type={q.type === 'multiple' ? 'checkbox' : 'radio'}
                    name={`question-${q.id}`}
                    value={option}
                    checked={isChecked || false}
                    onChange={(e) =>
                      handleAnswerChange(q.id, option, q.type, e.target.checked)
                    }
                    className="mr-2"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExamPage;
