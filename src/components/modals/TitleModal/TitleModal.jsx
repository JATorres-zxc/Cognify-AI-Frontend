import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TitleModal.module.css';

const TitleModal = ({ isOpen, onClose, variant, redirectTo  }) => {
    const [title, setTitle] = useState('');
    const [count, setCount] = useState('');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleGenerate = () => {
        const payload = {
            variant,
            title,
            ...(variant !== 'note' && { count }),
        };
        
        // Logic to create notes/summary/etc. depending on the variant 
        navigate(redirectTo, { state: payload });
    };

    return (
        <div className={styles.overlay}>
        <div className={styles.modal}>
            <button aria-label="Close"onClick={onClose} className={styles.closeBtn}>×</button>

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
