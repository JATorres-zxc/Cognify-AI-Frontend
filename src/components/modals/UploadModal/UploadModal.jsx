import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api/ApiService';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose, onUploadComplete, autoGenerateSummary = false }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const [uploadProgress, setUploadProgress] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFileName(file.name);
            // Set a default title based on the file name (without extension)
            const defaultTitle = file.name.replace(/\.[^/.]+$/, "");
            setTitle(defaultTitle);
        }
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUpload = async () => {
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
            setUploadProgress('Uploading PDF...');
            const uploadResponse = await ApiService.uploadPDF(file, title);

            if (autoGenerateSummary) {
                // Step 2: Generate summary automatically
                setUploadProgress('Generating summary...');
                const summaryResponse = await ApiService.generateSummary(uploadResponse.id, {
                    complexity: 'medium',
                    language: 'English',
                    length: 'medium'
                });

                setMessage('✅ Upload and summary generation successful!');
                
                // Pass both upload and summary data to parent
                if (onUploadComplete) {
                    onUploadComplete({
                        uploadedNote: uploadResponse,
                        generatedSummary: summaryResponse
                    });
                }
            } else {
                setMessage('✅ Upload successful!');
                
                if (onUploadComplete) {
                    onUploadComplete({ uploadedNote: uploadResponse });
                }
            }

            // Reset form
            setFile(null);
            setTitle('');
            setSelectedFileName('');
            setUploadProgress('');
            
            // Close the modal after a short delay
            setTimeout(() => {
                onClose();
                // Only reload if not using callback (for backward compatibility)
                if (!onUploadComplete) {
                    window.location.reload();
                }
            }, 1500);
        } catch (error) {
            setMessage(`❌ ${error.message}`);
            setUploadProgress('');

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
        setUploadProgress('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button 
                    className="close-btn" 
                    aria-label="Close" 
                    onClick={handleClose}
                >
                    ×
                </button>

                <div className='modal-main'>
                    <h2>{autoGenerateSummary ? 'Upload PDF & Generate Summary' : 'Upload PDF'}</h2>
                    <div className='title-container'>
                      <h3>Title:</h3>
                      <input 
                        type="text"
                        placeholder=""
                        value={title}
                        onChange={handleTitleChange}
                        className="title-input"
                      />
                    </div>

                    <div className='input-container'>
                        <input 
                            type="file" 
                            id="upload-pdf" 
                            accept="application/pdf" 
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="upload-pdf" className="custom-file-label">
                            {loading ? 'Processing...' : 'Choose File'}
                        </label>

                        {selectedFileName && (
                            <p className="file-name">{selectedFileName}</p>
                        )}
                    </div>

                    {uploadProgress && (
                        <div className="progress-indicator">
                            <p>{uploadProgress}</p>
                            <div className="progress-bar">
                                <div className="progress-bar-fill"></div>
                            </div>
                        </div>
                    )}

                    <button 
                        className="upload-btn" 
                        onClick={handleUpload} 
                        disabled={loading || !title.trim()}
                    >
                        {loading ? (autoGenerateSummary ? 'Uploading & Generating...' : 'Uploading...') : 'Upload'}
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default UploadModal;
