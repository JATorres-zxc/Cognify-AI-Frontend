import React, { useState } from 'react';
import { ApiService } from '../../../services/api/ApiService';

import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './FlashcardGenerator.module.css';
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';
import FlashcardUploadModal from '../../../components/modals/FlashcardUploadModal/FlashcardUploadModal';
import { useModalStack } from '../../../hooks/useModalStack';

const MODALS = {
    FILE: 'file',
    NOTES: 'notes',
    TITLE: 'title',
};

const FlashcardGenerator = () => {
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);
    const [isFlashcardUploadModalOpen, setFlashcardUploadModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [generatedFlashcards, setGeneratedFlashcards] = useState(null);
    const [uploadedNote, setUploadedNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const openFileModal = () => {
        setFileModalOpen(true);
        setNotesModalOpen(false);
        setFlashcardUploadModalOpen(false);
    }

    const openNotesModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(true);
        setFlashcardUploadModalOpen(false);
    }

    const openTitleModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(false);
        setFlashcardUploadModalOpen(true);
    }
    
    const handleNoteSelect = (note) => {
        setSelectedNote(note);
        setUploadedNote(null); // Clear uploaded note when selecting from existing
        setGeneratedFlashcards(null); // Clear previous flashcards
        setCurrentFlashcardIndex(0);
        setShowAnswer(false);
        setError(null);
    };

    const handleFlashcardsGenerated = (data) => {
        setUploadedNote(data.uploadedNote);
        setGeneratedFlashcards(data.generatedFlashcards);
        setSelectedNote(null); // Clear selected note when uploading new
        setCurrentFlashcardIndex(0);
        setShowAnswer(false);
        setError(null);
    };

    const generateFlashcards = async (flashcardParams = {}) => {
        if (!selectedNote) {
            setError('Please select a note first');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const flashcards = await ApiService.generateFlashcards(selectedNote.id, flashcardParams);
            setGeneratedFlashcards(flashcards);
            setCurrentFlashcardIndex(0);
            setShowAnswer(false);
        } catch (err) {
            setError(err.message);
            console.error('Error generating flashcards:', err);
        } finally {
            setLoading(false);
        }
    };

    // Flashcard navigation functions
    const nextFlashcard = () => {
        if (generatedFlashcards && generatedFlashcards.content) {
            const flashcards = Array.isArray(generatedFlashcards.content) 
                ? generatedFlashcards.content 
                : [];
            
            if (currentFlashcardIndex < flashcards.length - 1) {
                setCurrentFlashcardIndex(currentFlashcardIndex + 1);
                setShowAnswer(false);
            }
        }
    };

    const prevFlashcard = () => {
        if (currentFlashcardIndex > 0) {
            setCurrentFlashcardIndex(currentFlashcardIndex - 1);
            setShowAnswer(false);
        }
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    // Get current flashcard data
    const getCurrentFlashcard = () => {
        if (!generatedFlashcards || !generatedFlashcards.content) return null;
        
        const flashcards = Array.isArray(generatedFlashcards.content) 
            ? generatedFlashcards.content 
            : [];
            
        return flashcards[currentFlashcardIndex] || null;
    };

    const currentFlashcard = getCurrentFlashcard();
    const totalFlashcards = generatedFlashcards && generatedFlashcards.content 
        ? (Array.isArray(generatedFlashcards.content) ? generatedFlashcards.content.length : 0)
        : 0;

    return (
        <div className={styles["home"]}>
            <div>
                <Header />
            </div>
            <div className={styles["main"]}>
                <div className={styles["main-header"]}>
                    <h1>Flashcard Generator</h1>
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

                {(selectedNote || uploadedNote) && (
                    <div className={styles['selected-note']}>
                        <h3>
                            {uploadedNote ? 
                                `Uploaded: ${uploadedNote.title || 'Untitled'}` : 
                                `Selected Note: ${selectedNote.title || 'Untitled'}`
                            }
                        </h3>
                        {selectedNote && !generatedFlashcards && (
                            <button 
                                className={styles['generate-btn']}
                                onClick={() => generateFlashcards()}
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Flashcards'}
                            </button>
                        )}
                    </div>
                )}

                {error && (
                    <div className={styles['error-message']}>
                        {error}
                    </div>
                )}

                <div className={styles["note-wrapper"]}>
                    {generatedFlashcards && totalFlashcards > 0 ? (
                        <div className={styles["flashcard-container"]}>
                            {/* Flashcard Counter */}
                            <div className={styles["flashcard-counter"]}>
                                Card {currentFlashcardIndex + 1} of {totalFlashcards}
                            </div>

                            {/* Flashcard Display */}
                            <div className={styles["flashcard"]}>
                                <div className={styles["flashcard-content"]}>
                                    <div className={styles["question-section"]}>
                                        <h4>Question:</h4>
                                        <p>{currentFlashcard?.question || 'No question available'}</p>
                                    </div>
                                    
                                    {showAnswer && (
                                        <div className={styles["answer-section"]}>
                                            <h4>Answer:</h4>
                                            <p>{currentFlashcard?.answer || 'No answer available'}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Flashcard Controls */}
                                <div className={styles["flashcard-controls"]}>
                                    <button 
                                        className={styles["reveal-btn"]}
                                        onClick={toggleAnswer}
                                    >
                                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            <div className={styles["navigation-controls"]}>
                                <button 
                                    className={styles["nav-btn"]}
                                    onClick={prevFlashcard}
                                    disabled={currentFlashcardIndex === 0}
                                >
                                    Previous
                                </button>
                                
                                <button 
                                    className={styles["nav-btn"]}
                                    onClick={nextFlashcard}
                                    disabled={currentFlashcardIndex === totalFlashcards - 1}
                                >
                                    Next
                                </button>
                            </div>

                            {/* Flashcard Metadata */}
                            <div className={styles["flashcard-meta"]}>
                                <small>
                                    Generated on: {new Date(generatedFlashcards.created_at).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ) : (
                        <div className={styles["note-container"]}>
                            <div className={styles["note-tilt"]}></div>
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
                onSelectUploadPDF={openTitleModal}
            />

            <NotesSelectionModal
                isOpen= {isNotesModalOpen}
                onClose={()=> setNotesModalOpen(false)}
                onNoteSelect={handleNoteSelect}
            />

            <FlashcardUploadModal
                isOpen= {isFlashcardUploadModalOpen}
                onClose= {()=> setFlashcardUploadModalOpen(false)}
                onFlashcardsGenerated={handleFlashcardsGenerated}
            />
        </div>
    );
};

export default FlashcardGenerator;
