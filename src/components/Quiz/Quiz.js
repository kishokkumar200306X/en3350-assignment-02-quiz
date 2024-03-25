// import React from 'react';
// import './Quiz.css'

// function quiz() {
//     return (
//       <div className="container">
//         <h1>ECO QUEST - QUIZ </h1>
//         <hr/>
//         <h2>1. What energy source is used more in Sri Lanka?</h2>
//         <ul>
//             <li>Solar</li>
//             <li>Hydro</li>
//             <li>Carbon Products</li>
//             </ul>
//             <button>Next</button>
//             <div className='index' >1 of 5 question</div>

//       </div>
//     );
//   }

//   export default quiz;

import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { handleAnswerClick, handleNextClick, handleFinishClick } from './QuizHandlers';




function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showSelectAnswerMessage, setShowSelectAnswerMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Define isLoading state


  const [quizData, setQuizData] = useState([]);


  useEffect(() => {
    // Fetch quiz data from the backend API
    fetch('https://ecoquest-backend.onrender.com/get')
      .then(res => res.json())
      .then(data => {
        console.log('Quiz data:', data);
        setQuizData(data); // Set the fetched data to the state
        setIsLoading(false); // Set isLoading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
        setIsLoading(false); // Set isLoading to false in case of errors too
      });
  }, []);

  // If data is being fetched, show loading indicator
  if (isLoading) {
    return <div className="loading-container">
      <div className="loading-spinner" />
    </div>;
  }

  // If there's no quiz data available
  if (!quizData || quizData.length === 0 || currentQuestionIndex >= quizData.length) {
    return <div>No quiz data available</div>;
  }




  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="container">
      <h1>ECO QUEST - QUIZ</h1>
      <hr />
      <div>
        <h2>{currentQuestionIndex + 1}. {currentQuestion.question}</h2>
        <ul>
          {currentQuestion.answers.map((answer, answerIndex) => (
            <li
              key={answerIndex}
              className={selectedAnswers[currentQuestionIndex] === answerIndex ? 'selected' : ''}
              onClick={() => handleAnswerClick(answerIndex, currentQuestionIndex, setSelectedAnswers)}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
      {currentQuestionIndex === quizData.length - 1 ? (
        <button onClick={() => handleFinishClick(selectedAnswers, currentQuestionIndex, setShowSelectAnswerMessage, setCurrentQuestionIndex, quizData)}>Finish</button>
      ) : (
        <button onClick={() => handleNextClick(selectedAnswers, currentQuestionIndex, setCurrentQuestionIndex, quizData, setShowSelectAnswerMessage)}>Next</button>
      )}
      {showSelectAnswerMessage && <div>Please select one of the answers.</div>}
      <div className='index'>{currentQuestionIndex + 1} of {quizData.length} questions</div>
    </div>
  );
}

export default Quiz;











