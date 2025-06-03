import React from 'react';
import styles from './NotesSelectionModal.module.css';
import tempIcon from '../../../assets/images/sensai smol logo.png';   // Replace with actual path

const NotesSelectionModal = ({ isOpen, onClose}) => {
    //temporary placeholder values, replace with logic when backend is done please thanks
    //Logic is getting Notes from already built notes
    const notes = [
    { id: 1, title: "Note 1" },
    { id: 2, title: "Meeting Notes" },
    { id: 3, title: "Shopping List" },
    { id: 4, title: "Project Plan" },
    { id: 5, title: "Ideas" },
    ];

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button aria-label="Close" onClick={onClose} className={styles.closeBtn}>×</button>
                
                <div className={styles.buttonColumn}>
                    {notes.map(note => (
                        <button className={styles.modalBtn}>
                            <img src={tempIcon} alt="Note Icon" className={styles.icon} />
                            {note.title}
                        </button>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default NotesSelectionModal;
