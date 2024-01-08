import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import HomePage from './components/HomePage';
import TaskForm from './components/TaskForm';

import './styles/App.css';

const ModulZadan = () => {
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path='/task-form' element={<TaskForm />} />
        </Routes>
  );
};

export default ModulZadan;
