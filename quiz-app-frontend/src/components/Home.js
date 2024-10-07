import React, { useState, useEffect } from 'react';
import { getAllQuestionSets } from '../utils/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [questionSets, setQuestionSets] = useState([]);

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await getAllQuestionSets();
        setQuestionSets(response);
      } catch (error) {
        console.error('Error fetching question sets:', error);
      }
    };
    fetchQuestionSets();
  }, []);

  return (
    <div className="p-6 h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-gray-900">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Available Question Sets</h2>
      {questionSets && questionSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questionSets.map((set) => (
            <div
              key={set.id}
              className="bg-gray-100 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{set.title}</h3>
                <div className="flex items-center text-gray-600">
                  {/* Using a Unicode clock character */}
                  <span className="mr-2 text-lg">⏱️</span>
                  <p className="text-lg">{set.timer} minutes</p>
                </div>
              </div>
              <Link
                to={`/exam/${set.id}`}
                aria-label={`Start ${set.title} exam`}
                className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Start Exam
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg font-medium text-white text-center">No question sets available.</p>
      )}
    </div>
  );
};

export default Home;