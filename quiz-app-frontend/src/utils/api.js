import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:5000/api';

// Function to save a question set (POST)
export const saveQuestionSet = async (questionSet) => {
  try {
    const response = await axios.post(`${API_URL}/save-question-set`, questionSet);
    return response.data;
  } catch (error) {
    console.error('Error saving question set:', error);
    throw error;
  }
};

// Function to fetch all question sets (GET)
export const getAllQuestionSets = async () => {
  try {
    const response = await axios.get(`${API_URL}/question-sets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question sets:', error);
    throw error;
  }
};

// Function to fetch a single question set by ID (GET)
export const getQuestionSetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/question-sets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question set:', error);
    throw error;
  }
};

// Function to submit answers and get result (POST)
export const submitAnswers = async (id, answers) => {
  try {
    const response = await axios.post(`${API_URL}/submit-answers/${id}`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers:', error);
    throw error;
  }
};

// Function to fetch the result by result ID (GET)
export const getResultById = async (resultId) => {
  try {
    const response = await axios.get(`${API_URL}/results/${resultId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching result:', error);
    throw error;
  }
};

// Delete question set by ID
export const deleteQuestionSet = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/question-sets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question set:', error);
    throw error;
  }
};
