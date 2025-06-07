import React from 'react';
import styles from './QuizCard.module.css';

const QuizCard = ({ question, options = [], mode = 'multiple', onChange, value, number }) => {
    const getOptionLabel = (idx) => String.fromCharCode(97 + idx) + '.';

    return (
        <div className={styles.card}>
            <div className={styles.question}>
                <p className={styles.questiontext}>
                    {number !== undefined ? <span className={styles.questionNumber}>{number}. </span> : null}
                    {question}
                </p>
            </div>
            <div className={styles.answerSection}>
                {mode === 'short' && (
                    <input
                        type="text"
                        className={styles.input}
                        value={value || ''}
                        onChange={e => onChange && onChange(e.target.value)}
                        placeholder="Type your answer..."
                    />
                )}
                {mode === 'truefalse' && (
                    <div className={styles.options}>
                        <button
                            type="button"
                            className={`${styles.optionBtn} ${styles.centeredOptionBtn} ${value === 'true' ? styles.selected : ''}`}
                            onClick={() => onChange && onChange('true')}
                        >
                            True
                        </button>
                        <button
                            type="button"
                            className={`${styles.optionBtn} ${styles.centeredOptionBtn} ${value === 'false' ? styles.selected : ''}`}
                            onClick={() => onChange && onChange('false')}
                        >
                            False
                        </button>
                    </div>
                )}
                {mode === 'multiple' && (
                    <div className={styles.options}>
                        {options.map((option, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`${styles.optionBtn} ${value === option ? styles.selected : ''}`}
                                onClick={() => onChange && onChange(option)}
                            >
                                <span className={styles.optionLabel}>{getOptionLabel(idx)}</span> {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizCard;