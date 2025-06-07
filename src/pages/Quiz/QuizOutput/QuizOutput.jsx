import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './QuizOutput.module.css'
import QuizCard from '../../../components/common/QuizCard/QuizCard';
import { useNavigate } from 'react-router-dom';

//change this to the fetched quiz data from the backend ples tenkx
const quizData = [
    {
        number: 1,
        question: "Question",
        options: ["22", "3", "4"],
        mode: "multiple",
    },
    {
        number: 2,
        question: "Is the sky blue?sssssssssssssasddddddddddddddssssasddddddddddddddssssasddddddddddddddssssasddddddddddddddssssasddddddddddddddssssasddddddddddddddssssasdddddddddddddddddddddd",
        mode: "truefalse",
    },
    {
        number: 3,
        question: "Explain gravity.",
        mode: "short",
    }
];


const QuizOutput = () => {
    const navigate = useNavigate();

    // State for each answer, indexed by question number (or index)
    const [answers, setAnswers] = useState(Array(quizData.length).fill(''));

    const handleChange = (idx, value) => {
        setAnswers(prev => {
            const updated = [...prev];
            updated[idx] = value;
            return updated;
        });
    };

    
    const handleSubmit = () => {
        navigate('/quizscore', {
        state: {
            quizData,
            userAnswers: answers,
        }
        });
    };

    return (
        <div className={styles.home}>
            <div>
            <Header />
            </div>
            <div className={styles.main}>
                <div className={styles["main-header"]}>
                    <h1>Quiz Title</h1>
                </div>
                <div className={styles.line}></div>
                


                <div className={styles["btn-container"]}>
                    <button 
                        className={styles["back-btn"]}
                        onClick={() => navigate(-1)}
                    >
                        &#8592;
                    </button>
                    
                    <p className={styles["good-luck"]}> Good Luck! </p>
                </div>
                
                <div className={styles.linetwo}></div>

                {quizData.map((q, idx) => (
                    <QuizCard
                        key={q.number}
                        number={q.number}
                        question={q.question}
                        options={q.options}
                        mode={q.mode}
                        value={answers[idx]}
                        onChange={val => handleChange(idx, val)}
                    />
                ))}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <button className={styles["submit-btn"]} onClick = {handleSubmit}>
                        Submit
                    </button>
                </div>
                
            </div>

            <div>
                <Footer />
            </div>
            
        </div>
        
    );
};

export default QuizOutput;
