const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// GET all question sets
router.get('/question-sets', quizController.getAllQuestionSets);

// GET all questions by id
router.get('/question-sets/:id', quizController.getQuestionSetById);

// GET result by id
router.get('/results/:id', quizController.getResultsById);

// POST user answers and calculate score
router.post('/submit-answers/:id', quizController.submitQuiz);

router.post('/save-question-set', quizController.saveJSONQuestion);

module.exports = router;
