import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './NoteUpload.module.css';
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';
import TitleModal from '../../../components/modals/TitleModal/TitleModal';

const NoteUpload = () => {
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);
    const [isTitleModalOpen, setTitleModalOpen] = useState(false);

    const openFileModal = () => {
        setFileModalOpen(true);
        setNotesModalOpen(false);
        setTitleModalOpen(false);
    }

    const openNotesModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(true);
        setTitleModalOpen(false);
    }

    const openTitleModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(false);
        setTitleModalOpen(true);
    }
    
    return (
        <div className={styles["home"]}>
            <div>
            <Header />
            </div>
            <div className={styles["main"]}>
                <div className={styles["main-header"]}>
                    <h1>Generate Notes</h1>
                </div>
                <div className={styles["line"]}></div>

                <div className="btn-container">
                    <button 
                    className={styles["upload-btn"]}
                    onClick={() => openFileModal()}
                    >
                        Upload
                    </button>
                </div>

                <div className={styles["note-container"]}>
                </div>
                
            </div>

            <div>
                <Footer />
            </div>

            <FileUploadModal
                isOpen={isFileModalOpen}
                onClose={()=> setFileModalOpen(false)}
                onSelectNotes={openNotesModal}
                onSelectUploadPDF={openTitleModal}
            />

            <NotesSelectionModal
                isOpen= {isNotesModalOpen}
                onClose={()=> setNotesModalOpen(false)}
            />

            <TitleModal
                isOpen= {isTitleModalOpen}
                onClose= {()=> setTitleModalOpen(false)}
                variant= "note"
                redirectTo="/noteoutput"
            />

        </div>
    );
};

export default NoteUpload;
