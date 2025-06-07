import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './QuizScore.module.css';

// Example correct answers for demonstration (replace with backend data as needed)
const correctAnswers = {
  1: "3", // for question 1 (multiple choice)
  2: "true", // for question 2 (true/false)
  3: "gravity is a force" // for question 3 (short answer, case-insensitive contains check)
};

const QuizScore = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Get quizData and userAnswers from location.state
    const { quizData, userAnswers } = location.state || { quizData: [], userAnswers: [] };

    // Calculate score and correctness
    let score = 0;
    const results = quizData.map((q, idx) => {
    let isCorrect = false;
    const userAnswer = userAnswers[idx] || '';
    const correct = correctAnswers[q.number];

    if (q.mode === "multiple") {
        isCorrect = userAnswer === correct;
    } else if (q.mode === "truefalse") {
        isCorrect = userAnswer.toLowerCase() === correct;
    } else if (q.mode === "short") {
      // Simple contains check for demo
        isCorrect = userAnswer.trim().toLowerCase().includes(correct);
    }
    if (isCorrect) score += 1;
    return { ...q, userAnswer, isCorrect, correct };
    });

return (
    <div className={styles.home}>
      <Header />
      <div className={styles.main}>
        <div className={styles["main-header"]}>
          <h1>Quiz Results</h1>
        </div>
        <div className={styles.line}></div>
        <div className={styles["score-container"]}>
          <span className={styles["score-label"]}>Score:</span>
          <span className={styles["score-value"]}>{score} / {quizData.length}</span>
        </div>
        <div className={styles["results-list"]}>
          {results.map((q, idx) => (
            <div
              key={q.number}
              className={`${styles["result-card"]} ${q.isCorrect ? styles.correct : styles.incorrect}`}
            >
              <div className={styles["question"]}>
                <b>Q{q.number}:</b> {q.question}
              </div>
              <div className={styles["answer-row"]}>
                <span>Your answer: <b>{q.userAnswer || <i>Blank</i>}</b></span>
                <span>
                  {q.isCorrect ? (
                    <span className={styles["correct-text"]}>Correct</span>
                  ) : (
                    <span className={styles["incorrect-text"]}>
                      Incorrect (Correct: <b>{q.correct}</b>)
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button
          className={styles["back-btn"]}
          onClick={() => navigate('/quiz')}
        >
          Back to Quiz
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default QuizScore;