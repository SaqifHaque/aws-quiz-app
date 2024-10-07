import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getResultById } from '../utils/api'; // A function to fetch result data if needed

const ResultPage = () => {
  const { id } = useParams(); // Get the quiz ID from the URL
  const location = useLocation();
  const [resultData, setResultData] = useState({
    score: null,
    percentage: null,
    title: '',
  });
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (location.state) {
      // Data is passed via navigation
      setResultData({
        score: location.state.score,
        percentage: location.state.percentage,
        title: location.state.title,
      });
    } else {
      // No data passed; fetch from the server
      const fetchData = async () => {
        try {
          const data = await getResultById(id);
          setResultData({
            score: data.score,
            percentage: data.percentage,
            title: data.title,
          });
        } catch (error) {
          console.error('Error fetching result data:', error);
        }
      };
      fetchData();
    }
  }, [id, location.state]);

  useEffect(() => {
    if (resultData.percentage) {
      setIsPassed(resultData.percentage >= 70);
    }
  }, [resultData]);

  const { score, percentage, title } = resultData;

  return (
    <div className="p-6 h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-gray-900">
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">{title}</h2>
        <p className="text-xl mb-2">Your Score: {score}</p>
        <p className="text-xl mb-2">Percentage: {percentage}%</p>
        {isPassed ? (
          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-bold text-green-600">Congratulations! You Passed!</h3>
            <p className="text-lg text-gray-600">You scored {percentage}% and passed the quiz!</p>
          </div>
        ) : (
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-bold text-red-600">Sorry, You Failed!</h3>
            <p className="text-lg text-gray-600">You scored {percentage}% and did not pass the quiz.</p>
          </div>
        )}
        {isPassed && (
          <div className="animate-bounce">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;