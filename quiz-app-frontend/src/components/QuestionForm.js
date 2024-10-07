import React, { useState } from 'react';
import { saveQuestionSet } from '../utils/api';
import { parse } from 'postcss';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [timer, setTimer] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedQuestions = JSON.parse(jsonData.trim());
      await saveQuestionSet({
        title,
        questions: parsedQuestions,
        timer,
      });
      console.log('Question set saved successfully');
      setTitle('');
      setJsonData('');
      setTimer(0);
    } catch (error) {
      console.error('Error saving question set', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-12">
      <h2 className="text-2xl font-bold mb-4">Create Question Set</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-900">Question Set Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-900">Timer (minutes):</label>
          <input
            type="number"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-900">Paste JSON Questions:</label>
          <textarea
            rows={10}
            cols={50}
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='Paste your JSON questions here. Example format:
            {
              "questionText": "Your question here?",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "correctAnswer": ["Correct Option"],
              "type": "single/multiple",
              "points": 1
            },'
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Submit Question Set
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;