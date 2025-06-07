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
        <div className={styles.home} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div>
                <Header />
            </div>
            <div className={styles.main} style={{ flex: 1 }}>
                <div className={styles["main-header"]}>
                    <h1>Quiz Title</h1>
                </div>
                <div className={styles.line}></div>
                
                <div className={styles["type-selection"]}>
                    <p>Choose your type of quiz</p>

                    <div className={styles["button-grid"]}>
                        <button className={styles["outside-btn"]} onClick={openQuizType}>
                            Multiple <br /> Choice
                        </button>
                        <div className={styles["locked-btn-wrapper"]}>
                            <button className={styles["inside-btn"]} disabled>
                                True / False
                            </button>
                            <span className={styles["locked-overlay"]}>Coming Soon</span>
                        </div>
                        <div className={styles["locked-btn-wrapper"]}>
                            <button className={styles["inside-btn"]} disabled>
                                Short Answer
                            </button>
                            <span className={styles["locked-overlay"]}>Coming Soon</span>
                        </div>
                        <div className={styles["locked-btn-wrapper"]}>
                            <button className={styles["outside-btn"]} disabled>
                                Fill in the <br /> Blank
                            </button>
                            <span className={styles["locked-overlay"]}>Coming Soon</span>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default QuizGenerator;
