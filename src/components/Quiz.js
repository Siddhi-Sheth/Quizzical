import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    axios
      .get('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
      .then(response => {
        const results = response.data.results;
        setQuestions(results);
        setAnswers(new Array(results.length).fill(''));
        setCorrectAnswers(results.map(item => item.correct_answer));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        newScore++;
      }
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <div className="Quiz-page">
      {questions.map((item, index) => (
        <div key={index}>
          <h2 className="Quiz-question">{item.question}</h2>
          <ul className="Quiz-options" >
          <li>
              <label>
                <input type="radio" name={`question${index}`} value={item.correct_answer} onChange={() => handleAnswer(index, item.correct_answer)} />
                {item.correct_answer}
              </label>
            </li>
            {item.incorrect_answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <label className="Quiz-option" >
                  <input type="radio" name={`question${index}`} value={answer} onChange={() => handleAnswer(index, answer)} />
                  {answer}
                </label>
              </li>
              
            ))}
            
          </ul>
        </div>
      ))}
      <button onClick={checkAnswers} className="submit--btn">Check Answers</button>
      {showScore && (
        <div>
          <h2>Your Score: {score}/{questions.length}</h2>
          {/* <h2>Correct Answers:</h2>
          <ul>
            {correctAnswers.map((answer, answerIndex) => (
              <li key={answerIndex}>{answer}</li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
}

export default Quiz;
