import React from 'react';
import styles from './FileUploadModal.module.css';
import folderIcon from '../../../assets/icons/folder.svg';
import noteIcon from '../../../assets/icons/note.svg'; 

//Add logic for Uploading PDF

const FileUploadModal = ({ isOpen, onClose, onSelectNotes, onSelectUploadPDF}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <button aria-label="Close" onClick={onClose} className={styles.closeBtn}>×</button>

                <div className={styles.buttonColumn}>
                    <button 
                    className={styles.modalBtn}
                    onClick={onSelectUploadPDF}
                    >
                        <img src={noteIcon} alt="Upload" className={styles.icon} />
                        Upload PDF
                    </button>
                    <button 
                    className={styles.modalBtn}
                    onClick={onSelectNotes}
                    >
                        <img src={folderIcon} alt="Notes" className={styles.icon} />
                        Select from Notes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUploadModal;
