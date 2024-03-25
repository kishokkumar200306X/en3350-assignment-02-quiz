export const handleAnswerClick = (answerIndex, currentQuestionIndex, setSelectedAnswers) => {
    setSelectedAnswers(prevSelectedAnswers => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = answerIndex;
      return newSelectedAnswers;
    });
  };




export const handleNextClick = (selectedAnswers, currentQuestionIndex, setCurrentQuestionIndex, quizData, setShowSelectAnswerMessage) => {
    if (selectedAnswers[currentQuestionIndex] !== null && selectedAnswers[currentQuestionIndex] !== undefined) {
      setShowSelectAnswerMessage(false); // Reset the message
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    } else {
      setShowSelectAnswerMessage(true); // Show the message
    }
  };
  



  // quizHandlers.js
export const handleFinishClick = (selectedAnswers, currentQuestionIndex, setShowSelectAnswerMessage, setCurrentQuestionIndex, quizData) => {
    if (selectedAnswers[currentQuestionIndex] !== null && selectedAnswers[currentQuestionIndex] !== undefined) {
      setShowSelectAnswerMessage(false); // Reset the message
      console.log('Quiz finished!');
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
  
      // Perform any action needed when the quiz is finished
      console.log('Selected Answers:', selectedAnswers);
  
      // Prepare the data to be sent to the backend API
      const requestData = {
        sel_answers: selectedAnswers
      };
  
      // Send the selected answers to the backend API
      fetch('https://example.com/api/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response from the API
        console.log('Answers submitted successfully:', data);
      })
      .catch(error => {
        // Handle error from the API
        console.error('Error submitting answers:', error);
      });
    } else {
      setShowSelectAnswerMessage(true); // Show the message
    }
  };
  