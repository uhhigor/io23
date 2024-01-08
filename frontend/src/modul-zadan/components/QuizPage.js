import '../styles/QuizPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quizQuestions from '../quizData.json';

const shuffleArray = (array, length) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, length);
};

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const category = getCategoryFromUrl();
    const categoryQuestions = quizQuestions.filter(question => question.category === category);
    setShuffledQuestions(shuffleArray(categoryQuestions, 10));
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < shuffledQuestions.length) {
      const currentQuestion = shuffledQuestions[currentQuestionIndex];
      setShuffledAnswers(shuffleArray(currentQuestion.answers, 4));
    }
  }, [currentQuestionIndex, shuffledQuestions]);

  const getCategoryFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('category');
  };
  const getTaskIDFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('taskID');
  };

  const handleNextButtonClick = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const checkAnswer = (answerText) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (currentQuestion.answers.find(answer => answer.text === answerText && answer.correct)) {
      setPoints(points + 1);
    }
    setSelectedAnswer(answerText);
  };

  const goBackToHome = () => {
    navigate('/');
  };

  const currentQuestion = currentQuestionIndex < shuffledQuestions.length
    ? shuffledQuestions[currentQuestionIndex]
    : null;

  const getButtonClass = (answerText) => {
    if (selectedAnswer === null) {
      return "btn btn-primary w-100 d-block mb-2";
    }
    if (answerText === selectedAnswer) {
      return `btn ${selectedAnswer === currentQuestion.answers.find(a => a.correct).text ? 'btn-success' : 'btn-danger'} w-100 d-block mb-2`;
    }
    return "btn btn-primary w-100 d-block mb-2";
  };

  async function completeTask() {
    try {
      const response = await fetch(`http://localhost:8000/task/complete/${getTaskIDFromUrl()}`, {
        method: "PUT"
    });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Błąd podczas zaliczania zadania:', error);
    }
  };

  const getResultMessage = () => {
    if (points < (shuffledQuestions.length * 0.9)) {
      return "Quiz niezaliczony, spróbuj ponownie.";
    } else {
      console.log("length: ", shuffledQuestions.length);
      if(shuffledQuestions.length !== 0) {
        completeTask();
      }
      return "Quiz zaliczony.";
    }
  };

  return (
    <div id="quizContainer" className="container mt-3">
      {currentQuestion ? (
        <>
          <h4 className="mb-4">Pytanie {currentQuestionIndex + 1}</h4>
          <div className="card">
            <div className="card-header">
              <h5>{currentQuestion.question}</h5>
            </div>
            <div className="card-body">
              {shuffledAnswers.map((answer, index) => (
                <button
                  key={index}
                  disabled={selectedAnswer !== null}
                  onClick={() => checkAnswer(answer.text)}
                  className={getButtonClass(answer.text)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div id="resultContainer" className="card">
          <div className="card-body text-center">
            <h5 id="resultMessage" className="card-title">
              {getResultMessage()}
            </h5>
            <p className="card-text">Twój wynik: {points}/{shuffledQuestions.length}</p>
            <button className="btn btn-secondary" onClick={goBackToHome}>Powrót do strony głównej</button>
          </div>
        </div>
      )}

      {selectedAnswer && (
        <button className="btn btn-info my-2" onClick={handleNextButtonClick}>Następne pytanie</button>
      )}
    </div>
  );
};

export default QuizPage;
