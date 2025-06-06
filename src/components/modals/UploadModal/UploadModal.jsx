import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api/ApiService';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
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
            await ApiService.uploadPDF(file, title);
            setMessage('✅ Upload successful!');
            setFile(null);
            setTitle('');
            setSelectedFileName('');
            // Close the modal after a short delay
            setTimeout(() => {
                onClose();
                // Force reload the MyStudy page to refresh the uploads list
                window.location.reload();
            }, 1500);
        } catch (error) {
            setMessage(`❌ ${error.message}`);
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

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button 
                    className="close-btn" 
                    aria-label="Close" 
                    onClick={onClose}
                >
                    ×
                </button>

                <div className='modal-main'>
                    <h2>Upload PDF</h2>
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
                        <label htmlFor="upload-pdf" className="custom-file-label">Choose File</label>

                        {selectedFileName && (
                            <p className="file-name">{selectedFileName}</p>
                        )}
                    </div>

                    <button 
                        className="upload-btn" 
                        onClick={handleUpload} 
                        disabled={loading || !title.trim()}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default UploadModal;
