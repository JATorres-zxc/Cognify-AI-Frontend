import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../../services/api/ApiService';
import styles from './QuizUploadModal.module.css'; // You can reuse SummaryUploadModal.module.css or create new styles

const QuizUploadModal = ({ isOpen, onClose, onQuizGenerated, selectedQuizType }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currentStep, setCurrentStep] = useState('');
    const [quotaInfo, setQuotaInfo] = useState(null);
    const [quizParams, setQuizParams] = useState({
        complexity: 'medium',
        language: 'English',
        numQuestions: 10
    });
    const navigate = useNavigate();

    const quizTypeLabels = {
        'multiple_choice': 'Multiple Choice',
        'true_false': 'True/False',
        'short_answer': 'Short Answer',
        'fill_blank': 'Fill in the Blank'
    };

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

    const handleParamChange = (param, value) => {
        setQuizParams(prev => ({
            ...prev,
            [param]: value
        }));
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

        if (!selectedQuizType) {
            setMessage('Please select a quiz type first.');
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
            
            // Step 2: Generate quiz
            setCurrentStep(`Generating ${quizTypeLabels[selectedQuizType]} quiz...`);
            console.log("Starting quiz generation for note ID: ", uploadResponse.id);

            // Prepare quiz parameters
            const finalQuizParams = {
                ...quizParams,
                quiz_type: selectedQuizType
            };

            const quizResponse = await ApiService.generateQuiz(uploadResponse.id, finalQuizParams);
            console.log("Quiz response: ", quizResponse);

            setMessage(`✅ Upload and ${quizTypeLabels[selectedQuizType]} quiz generation completed!`);
            setCurrentStep('Complete!');
            
            // Pass the results to parent component
            if (onQuizGenerated) {
                onQuizGenerated({
                    uploadedNote: uploadResponse,
                    generatedQuiz: quizResponse,
                    quotaRemaining: quotaInfo ? quotaInfo.remaining - 1 : null,
                    quizType: selectedQuizType
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
        setQuizParams({
            complexity: 'medium',
            language: 'English',
            numQuestions: 10
        });
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
                    <h2>Upload PDF & Generate {selectedQuizType ? quizTypeLabels[selectedQuizType] : ''} Quiz</h2>

                    {/* Quota Info */}
                    {quotaInfo && (
                        <div className={styles.quotaInfo}>
                            <small>
                                Daily generations: {quotaInfo.used}/{quotaInfo.limit} 
                                ({quotaInfo.remaining} remaining)
                            </small>
                        </div>
                    )}

                    {/* Quiz Type Display */}
                    {selectedQuizType && (
                        <div className={styles.quizTypeInfo}>
                            <p><strong>Quiz Type:</strong> {quizTypeLabels[selectedQuizType]}</p>
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
                                id="upload-pdf-quiz" 
                                accept="application/pdf" 
                                onChange={handleFileChange}
                                className={styles.fileInput}
                                disabled={loading}
                            />
                            <label htmlFor="upload-pdf-quiz" className={styles.customFileLabel}>
                                {loading ? 'Processing...' : 'Choose PDF File'}
                            </label>

                            {selectedFileName && (
                                <p className={styles.fileName}>Selected: {selectedFileName}</p>
                            )}
                        </div>
                    </div>

                    {/* Quiz Parameters Section */}
                    <div className={styles.section}>
                        <h3>Quiz Settings</h3>
                        
                        <div className={styles.paramContainer}>
                            <label>Complexity:</label>
                            <select 
                                value={quizParams.complexity}
                                onChange={(e) => handleParamChange('complexity', e.target.value)}
                                className={styles.paramSelect}
                                disabled={loading}
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className={styles.paramContainer}>
                            <label>Language:</label>
                            <select 
                                value={quizParams.language}
                                onChange={(e) => handleParamChange('language', e.target.value)}
                                className={styles.paramSelect}
                                disabled={loading}
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Chinese">Chinese</option>
                            </select>
                        </div>

                        <div className={styles.paramContainer}>
                            <label>Number of Questions:</label>
                            <select 
                                value={quizParams.numQuestions}
                                onChange={(e) => handleParamChange('numQuestions', parseInt(e.target.value))}
                                className={styles.paramSelect}
                                disabled={loading}
                            >
                                <option value={5}>5 Questions</option>
                                <option value={10}>10 Questions</option>
                                <option value={15}>15 Questions</option>
                                <option value={20}>20 Questions</option>
                            </select>
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
                        disabled={loading || !title.trim() || !file || !selectedQuizType}
                    >
                        {loading ? 'Processing...' : `Upload & Generate ${selectedQuizType ? quizTypeLabels[selectedQuizType] : ''} Quiz`}
                    </button>

                    {/* Status Message */}
                    {message && <p className={styles.message}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default QuizUploadModal;