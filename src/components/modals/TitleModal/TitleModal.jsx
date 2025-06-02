import React, { useState } from 'react';
import styles from './TitleModal.module.css';

const TitleModal = ({ isOpen, onClose, variant }) => {
    const [title, setTitle] = useState('');
    const [count, setCount] = useState('');

    if (!isOpen) return null;

    const handleGenerate = () => {
        console.log({
        variant,
        title,
        ...(variant !== 'note' && { count }),
        });
        // Handle submission logic here
    };

    return (
        <div className={styles.overlay}>
        <div className={styles.modal}>
            <button onClick={onClose} className={styles.closeBtn}>×</button>

            <div className={styles.formGroup}>
            <label>Title:</label>
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />
            </div>

            {variant !== 'note' && (
            <div className={styles.formGroup}>
                <label>{variant === 'quiz' ? 'Total Questions:' : 'Total Cards:'}</label>
                <input
                type="number"
                placeholder={variant === 'quiz' ? "e.g. 10" : "e.g. 20"}
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className={styles.input}
                />
            </div>
            )}

            <div className={styles.buttonWrapper}>
                <button onClick={handleGenerate} className={styles.generateBtn}>
                    Generate!
                </button>
            </div>
        </div>
        </div>
    );
};

export default TitleModal;
