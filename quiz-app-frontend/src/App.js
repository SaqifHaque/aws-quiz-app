import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionForm from './components/QuestionForm';
import Home from './components/Home';
import ExamPage from './components/ExamPage';
import ResultPage from './components/ResultPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<QuestionForm />} />
        <Route path="/exam/:id" element={<ExamPage />} />
        <Route path="/result/:resultId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
