import React, { useState } from 'react';
import axios from 'axios';

const UploadNote = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'http://localhost:8000/api/user-notes/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            setMessage('Upload successful!');
            console.log(response.data);
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Upload failed. Check console for details.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Upload a PDF Note</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadNote;
