import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotesSelectionModal.module.css';
import noteIcon from '../../../assets/icons/note.svg';
import ApiService from '../../../services/api/ApiService';

const NotesSelectionModal = ({ isOpen, onClose, onNoteSelect }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetchNotes();
        }
    }, [isOpen]);

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ApiService.getUserNotes();
            setNotes(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching notes:', err);
            if (err.message.includes('Please login')) {
                // Redirect to login page after a short delay
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNoteSelect = (note) => {
        if (onNoteSelect) {
            onNoteSelect(note);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button aria-label="Close" onClick={onClose} className={styles.closeBtn}>×</button>
                
                <div className={styles.buttonColumn}>
                    {loading ? (
                        <div className={styles.loadingMessage}>Loading notes...</div>
                    ) : error ? (
                        <div className={styles.errorMessage}>{error}</div>
                    ) : notes.length === 0 ? (
                        <div className={styles.emptyMessage}>No notes found</div>
                    ) : (
                        notes.map(note => (
                            <button 
                                key={note.id}
                                className={styles.modalBtn}
                                onClick={() => handleNoteSelect(note)}
                            >
                                <img src={noteIcon} alt="Note Icon" className={styles.icon} />
                                {note.title || 'Untitled'}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesSelectionModal;
