import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './QuizGenerator.module.css';
import { useNavigate } from 'react-router-dom';

const QuizGenerator = () => {
    
    const navigate = useNavigate();
    
    const openQuizType = () => {
        //add logic to select quiz selection
        navigate('/quizoutput');
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
                
                <div className={styles["type-selection"]}>
                    <p>Choose your type of quiz</p>

                    <div className={styles["button-grid"]}>
                        <button className={styles["outside-btn"]}  onClick ={openQuizType}>Multiple <br /> Choice</button>
                        <button className={styles["inside-btn"]}>True / False</button>
                        <button className={styles["inside-btn"]}>Short Answer</button>
                        <button className={styles["outside-btn"]}>Fill in the <br /> Blank</button>
                    </div>

                </div>
                

            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default QuizGenerator;
