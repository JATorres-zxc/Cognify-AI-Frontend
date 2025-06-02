import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './SummaryGenerator.module.css';
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';

const SummaryGenerator = () => {
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);

    const openFileModal = () => {
        setFileModalOpen(true);
        setNotesModalOpen(false);
    }

    const openNotesModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(true);
    }

    return (
        <div className={styles["home"]}>
            <div>
            <Header />
            </div>
            <div className={styles['main']}>
                <div className={styles['main-header']}>
                    <h1>Summary Generator</h1>
                </div>
                <div className={styles['line']}></div>

                <div className='btn-container'>
                    <button 
                    className={styles['upload-btn']}
                    onClick={() => openFileModal()}
                    >
                        Upload
                    </button>
                </div>

                <div className={styles['note-container']}>
                </div>
                
            </div>

            <div>
                <Footer />
            </div>

            <FileUploadModal
                isOpen={isFileModalOpen}
                onClose={()=> setFileModalOpen(false)}
                onSelectNotes={openNotesModal}
            />

            <NotesSelectionModal
                isOpen= {isNotesModalOpen}
                onClose={()=> setNotesModalOpen(false)}
            />

        </div>
    );
};

export default SummaryGenerator;
