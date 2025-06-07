import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../../services/api/ApiService';
import styles from './FlashcardUploadModal.module.css';

const FlashcardUploadModal = ({ isOpen, onClose, onFlashcardsGenerated }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currentStep, setCurrentStep] = useState('');
    const [quotaInfo, setQuotaInfo] = useState(null);
    const [complexity, setComplexity] = useState('medium');
    const [language, setLanguage] = useState('English');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            const defaultTitle = file.name.replace(/\.[^/.]+$/, "");
            setTitle(defaultTitle);
        }
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUploadAndGenerate = async () => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        if (!title.trim()) {
            setMessage('Please enter a title.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Step 0: Check quota first
            setCurrentStep('Checking daily quota...');
            try {
                const quota = await ApiService.checkQuota();
                setQuotaInfo(quota);
                
                if (quota.remaining <= 0) {
                    throw new Error('Daily generation limit reached. Please try again tomorrow.');
                }
            } catch (quotaError) {
                console.warn('Could not check quota:', quotaError.message);
                // Continue anyway - the generation endpoint will handle quota
            }

            // Step 1: Upload the PDF
            setCurrentStep('Uploading PDF...');
            console.log('Starting PDF upload...');

            const uploadResponse = await ApiService.uploadPDF(file, title);
            console.log("Upload response: ", uploadResponse);

            if (!uploadResponse || !uploadResponse.id) {
                throw new Error('Upload failed - no valid response received');
            }
            
            // Step 2: Generate flashcards
            setCurrentStep('Generating flashcards...');
            console.log("Starting flashcard generation for note ID: ", uploadResponse.id);

            // Parameters for flashcard generation
            const flashcardParams = {
                complexity: complexity,
                language: language
            };

            const flashcardResponse = await ApiService.generateFlashcards(uploadResponse.id, flashcardParams);
            console.log("Flashcard response: ", flashcardResponse);

            setMessage('✅ Upload and flashcard generation completed!');
            setCurrentStep('Complete!');
            
            // Pass the results to parent component
            if (onFlashcardsGenerated) {
                onFlashcardsGenerated({
                    uploadedNote: uploadResponse,
                    generatedFlashcards: flashcardResponse,
                    quotaRemaining: quotaInfo ? quotaInfo.remaining - 1 : null
                });
            }

            // Reset form
            resetForm();
            
            // Close modal after delay
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Error in upload/generation process:', error);
            
            // Handle specific error types
            if (error.message.includes('virus') || error.message.includes('infected')) {
                setMessage('🦠 File appears to be infected and cannot be uploaded');
            } else if (error.message.includes('limit reached') || error.message.includes('QUOTA_EXCEEDED')) {
                setMessage('⏰ Daily generation limit reached. Try again tomorrow.');
            } else if (error.message.includes('PDF') || error.message.includes('extract')) {
                setMessage('📄 Could not process PDF. Please ensure it\'s a valid PDF file.');
            } else if (error.message.includes('login')) {
                setMessage('🔐 Please log in to continue');
                setTimeout(() => {
                    onClose();
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(`❌ ${error.message}`);
            }
            
            setCurrentStep('');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFile(null);
        setTitle('');
        setSelectedFileName('');
        setMessage('');
        setCurrentStep('');
        setQuotaInfo(null);
        setComplexity('medium');
        setLanguage('English');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button 
                    className={styles.closeBtn} 
                    aria-label="Close" 
                    onClick={handleClose}
                >
                    ×
                </button>

                <div className={styles.modalMain}>
                    <h2>Upload PDF & Generate Flashcards</h2>

                    {/* Quota Info */}
                    {quotaInfo && (
                        <div className={styles.quotaInfo}>
                            <small>
                                Daily generations: {quotaInfo.used}/{quotaInfo.limit} 
                                ({quotaInfo.remaining} remaining)
                            </small>
                        </div>
                    )}
                    
                    {/* File Upload Section */}
                    <div className={styles.section}>
                        <div className={styles.titleContainer}>
                            <label>Title:</label>
                            <input 
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                className={styles.titleInput}
                                disabled={loading}
                                placeholder="Enter document title"
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <input 
                                type="file" 
                                id="upload-pdf" 
                                accept="application/pdf" 
                                onChange={handleFileChange}
                                className={styles.fileInput}
                                disabled={loading}
                            />
                            <label htmlFor="upload-pdf" className={styles.customFileLabel}>
                                {loading ? 'Processing...' : 'Choose PDF File'}
                            </label>

                            {selectedFileName && (
                                <p className={styles.fileName}>Selected: {selectedFileName}</p>
                            )}
                        </div>
                    </div>

                    {/* Progress Section */}
                    {currentStep && (
                        <div className={styles.progressSection}>
                            <p className={styles.progressText}>{currentStep}</p>
                            <div className={styles.progressBar}>
                                <div className={styles.progressBarFill}></div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <button 
                        className={styles.uploadBtn} 
                        onClick={handleUploadAndGenerate} 
                        disabled={loading || !title.trim() || !file}
                    >
                        {loading ? 'Processing...' : 'Upload & Generate Flashcards'}
                    </button>

                    {/* Status Message */}
                    {message && <p className={styles.message}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default FlashcardUploadModal;