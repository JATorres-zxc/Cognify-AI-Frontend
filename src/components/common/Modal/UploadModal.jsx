import React, { useState } from 'react';
import ApiService from '../../../services/api/ApiService';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFileName(file.name);
        }
        
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await ApiService.uploadPDF(file);
            setMessage('✅ Upload successful!');
        } catch (error) {
            setMessage(`❌ Upload failed: ${error.message}`);
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

                    <div className='input-container'>
                        <input 
                        type="file" 
                        id="upload-pdf" 
                        accept="application/pdf" 
                        onChange={handleFileChange}
                        class="file-input"
                        />
                        <label htmlFor="upload-pdf" class="custom-file-label">Choose File</label>

                        {selectedFileName && (
                        <p className="file-name">{selectedFileName}</p>
                        )}
                    </div>

                    <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default UploadModal;
