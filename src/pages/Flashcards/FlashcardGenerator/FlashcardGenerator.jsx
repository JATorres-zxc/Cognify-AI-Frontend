import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './FlashcardGenerator.module.css';

const FlashcardGenerator = () => {
    return (
        <div className={styles["home"]}>
            <div>
            <Header />
            </div>
            <div className={styles["main"]}>
                <div className={styles["main-header"]}>
                    <h1>Flashcard Generator</h1>
                </div>
                <div className={styles["line"]}></div>

                <div className="btn-container">
                    <button className={styles["upload-btn"]}>
                        Upload
                    </button>
                </div>

                <div className={styles["note-wrapper"]}>
                    <div className={styles["note-tilt"]}></div>
                    <div className={styles["note-container"]}></div>
                </div>

                
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default FlashcardGenerator;
