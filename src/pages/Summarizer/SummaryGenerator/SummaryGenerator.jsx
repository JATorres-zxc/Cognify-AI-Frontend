import React from 'react';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './SummaryGenerator.module.css';
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';
import TitleModal from '../../../components/modals/TitleModal/TitleModal';
import { useModalStack } from '../../../hooks/useModalStack';

const MODALS = {
    FILE: 'file',
    NOTES: 'notes',
    TITLE: 'title',
};

const SummaryGenerator = () => {
    const { isOpen, open, close } = useModalStack(Object.values(MODALS));

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
                        onClick={() => open(MODALS.FILE)}
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
                isOpen={isOpen(MODALS.FILE)}
                onClose={close}
                onSelectNotes={() => open(MODALS.NOTES)}
                onSelectUploadPDF={() => open(MODALS.TITLE)}
            />

            <NotesSelectionModal
                isOpen={isOpen(MODALS.NOTES)}
                onClose={close}
            />

            <TitleModal
                isOpen={isOpen(MODALS.TITLE)}
                onClose={close}
                variant="note"
                redirectTo={"/summaryoutput"}
            />
        </div>
    );
};

export default SummaryGenerator;
