import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api/ApiService';
import styles from './SummaryUploadModal.module.css';

const SummaryUploadModal = ({ isOpen, onClose, onSummaryGenerated }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currentStep, setCurrentStep] = useState('');
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
            // Step 1: Upload the PDF
            setCurrentStep('Uploading PDF...');
            console.log('Starting PDF upload...');

            const uploadResponse = await ApiService.uploadPDF(file, title);
            console.log("Upload response: ", uploadResponse);

            if (!uploadResponse || !uploadResponse.id) {
                throw new Error('Upload failed - no valid response received');
            }
            
            // Step 2: Generate summary
            setCurrentStep('Generating summary...');
            console.log("Starting summary generation for note ID: ", uploadResponse.id);

            // Add default parameters for summary generation
            const summaryParams = {
                complexity: 'medium',
                language: 'English',
                length: 'medium'
            };

            const summaryResponse = await ApiService.generateSummary(uploadResponse.id, summaryParams);
            console.log("Summary response: ", summaryResponse);

            setMessage('✅ Upload and summary generation completed!');
            setCurrentStep('Complete!');
            
            // Pass the results to parent component
            if (onSummaryGenerated) {
                onSummaryGenerated({
                    uploadedNote: uploadResponse,
                    generatedSummary: summaryResponse,
                });
            }

            // Reset form
            resetForm();
            
            // Close modal after delay
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            setMessage(`❌ ${error.message}`);
            setCurrentStep('');
            
            if (error.message.includes('Please login')) {
                setTimeout(() => {
                    onClose();
                    navigate('/login');
                }, 2000);
            }
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
                    <h2>Upload PDF & Generate Summary</h2>
                    
                    {/* File Upload Section */}
                    <div className={styles.section}>
                        <h3>File Details</h3>
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
                        {loading ? 'Processing...' : 'Upload & Generate Summary'}
                    </button>

                    {/* Status Message */}
                    {message && <p className={styles.message}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SummaryUploadModal;