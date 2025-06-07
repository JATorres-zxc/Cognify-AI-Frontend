import React, { useState } from 'react';
import {ApiService} from '../../../services/api/ApiService';

import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './SummaryGenerator.module.css';
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';
import SummaryUploadModal from '../../../components/modals/SummaryUploadModal/SummaryUploadModal';

const SummaryGenerator = () => {
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);
    const [isSummaryUploadModalOpen, setSummaryUploadModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [generatedSummary, setGeneratedSummary] = useState(null);
    const [uploadedNote, setUploadedNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openFileModal = () => {
        setFileModalOpen(true);
        setNotesModalOpen(false);
        setSummaryUploadModalOpen(false);
    }

    const openNotesModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(true);
        setSummaryUploadModalOpen(false);
    }

    const openSummaryUploadModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(false);
        setSummaryUploadModalOpen(true);
    }

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
        setUploadedNote(null); // Clear uploaded note when selecting from existing
        setGeneratedSummary(null); // Clear previous summary
        setError(null);
    };

    const handleSummaryGenerated = (data) => {
        setUploadedNote(data.uploadedNote);
        setGeneratedSummary(data.generatedSummary);
        setSelectedNote(null); // Clear selected note when uploading new
        setError(null);
    };

    const generateSummary = async (summaryParams = {}) => {
        if (!selectedNote) {
            setError('Please select a note first');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const summary = await ApiService.generateSummary(selectedNote.id, summaryParams);
            setGeneratedSummary(summary);
        } catch (err) {
            setError(err.message);
            console.error('Error generating summary:', err);
        } finally {
            setLoading(false);
        }
    };

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

                {(selectedNote || uploadedNote) && (
                    <div className={styles['selected-note']}>
                        <h3>
                            {uploadedNote ? 
                                `Uploaded: ${uploadedNote.title || 'Untitled'}` : 
                                `Selected Note: ${selectedNote.title || 'Untitled'}`
                            }
                        </h3>
                        {selectedNote && !generatedSummary && (
                            <button 
                                className={styles['generate-btn']}
                                onClick={() => generateSummary()}
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Summary'}
                            </button>
                        )}
                    </div>
                )}

                {error && (
                    <div className={styles['error-message']}>
                        {error}
                    </div>
                )}

                <div className={styles['note-container']}>
                    {generatedSummary && (
                        <div className={styles['summary-content']}>
                            <h3>Generated Summary</h3>
                            <div className={styles['summary-text']}>
                                {generatedSummary.content?.summary || 
                                generatedSummary.summary || 
                                generatedSummary.content || 
                                'Summary not available'}
                            </div>
                            
                            {/* Show additional metadata */}
                            <div className={styles['summary-meta']}>
                                <small>
                                    Generated on: {new Date(generatedSummary.created_at).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    )}
                </div>
                
            </div>

            <div>
                <Footer />
            </div>

            <FileUploadModal
                isOpen={isFileModalOpen}
                onClose={()=> setFileModalOpen(false)}
                onSelectNotes={openNotesModal}
                onSelectUploadPDF={openSummaryUploadModal}
            />

            <NotesSelectionModal
                isOpen= {isNotesModalOpen}
                onClose={()=> setNotesModalOpen(false)}
                onNoteSelect={handleNoteSelect}
            />

            <SummaryUploadModal
                isOpen= {isSummaryUploadModalOpen}
                onClose= {()=> setSummaryUploadModalOpen(false)}
                onSummaryGenerated={handleSummaryGenerated}
            />

        </div>
    );
};

export default SummaryGenerator;
