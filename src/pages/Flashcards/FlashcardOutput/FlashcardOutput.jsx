import React, { useState, useEffect } from 'react';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './FlashcardOutput.module.css';
import { useNavigate } from 'react-router-dom';
//Add logic to fetch flashcards from the backend
const flashcards = [
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What is 2 + 2?", back: "4" },
    { front: "React is a ___ library.", back: "JavaScript" }
];

const FlashcardOutput = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [swapped, setSwapped] = useState(false);
    const [disableAnimation, setDisableAnimation] = useState(false);

    const handleCardClick = () => {
        setFlipped(f => !f);
        setSwapped(s => !s);
    };

    const handlePrev = () => {
        setCurrent(c => (c > 0 ? c - 1 : c));
    };

    const handleNext = () => {
        setCurrent(c => (c < flashcards.length - 1 ? c + 1 : c));
    };

    // Reset flip and swap when card changes
    useEffect(() => {
        setDisableAnimation(true);      // Disable animation
        setFlipped(false);
        setSwapped(false);

        // Re-enable animation after a tick
        const timeout = setTimeout(() => setDisableAnimation(false), 20);
        return () => clearTimeout(timeout);
    }, [current]);

    return (
        <div className={styles["home"]}>
            <div>
                <Header />
            </div>
            <div className={styles["main"]}>
                <div className={styles["main-header"]}>
                    <h1>Flashcard Title</h1>
                </div>
                <div className={styles["line"]}></div>

                <div className={styles["btn-container"]}>
                    <button 
                        className={styles["back-btn"]}
                        onClick={() => navigate(-1)}
                    >
                        &#8592;
                    </button>
                    <p className={styles["numbercount"]}>
                        {current + 1}/{flashcards.length}
                    </p>
                </div>

                <div className={styles["note-wrapper"]}>
                    <button
                        className={styles["nav-btn"]}
                        aria-label="Previous"
                        onClick={handlePrev}
                    >
                        ◀
                    </button>
                    <div
                        className={
                            swapped
                                ? `${styles["note-tilt"]} ${styles["swapped-tilt"]}`
                                : styles["note-tilt"]
                        }
                    ></div>
                    <div
                        className={
                            [
                                styles["note-container"],
                                flipped ? styles["flipped"] : "",
                                swapped ? styles["swapped-container"] : "",
                                disableAnimation ? styles["noTransition"] : ""
                            ].join(" ")
                        }
                        onClick={handleCardClick}
                        tabIndex={0}
                        role="button"
                        aria-pressed={flipped}
                    >
                        <div className={styles["note-content"]}>
                            {flashcards[current].front}
                        </div>
                        <div className={styles["note-content-back"]}>
                            {flashcards[current].back}
                        </div>
                    </div>

                    <button
                        className={styles["nav-btn"]}
                        aria-label="Next"
                        onClick={handleNext}
                    >
                        ▶
                    </button>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default FlashcardOutput;
