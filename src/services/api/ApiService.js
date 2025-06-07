import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ApiService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login/`, {
                username,
                password
            });
            // Store the token when login is successful
            const { key } = response.data;
            localStorage.setItem('token', key);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.non_field_errors?.[0] || 'Login failed');
        }
    },

    register: async (username, email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/registration/`, {
                username,
                email,
                password1: password,
                password2: password,
            });
            // Store the token when registration is successful
            const { key } = response.data;
            localStorage.setItem('token', key);
            return response.data;
        } catch (error) {
            const errorMessage = 
                error.response?.data?.email?.[0] || 
                error.response?.data?.password1?.[0] || 
                'Registration failed';
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        try {
            await axios.post(`${BASE_URL}/auth/logout/`, {}, {
                headers: ApiService.getAuthHeaders()
            });
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Logout error:', error);
            // Still remove the token even if the server request fails
            localStorage.removeItem('token');
        }
    },

    getAuthHeaders: () => {
        const token = localStorage.getItem('token');
        return token ? {
            'Authorization': `Token ${token}` // Changed from 'Bearer' to 'Token'
        } : {};
    },

    uploadPDF: async (file, title) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        
        try {
            const response = await axios.post(`${BASE_URL}/api/study/notes/`, formData, {
                headers: {
                    ...ApiService.getAuthHeaders(),
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to upload files');
            }
            // Handle specific PDF upload errors
            const errorMessage = error.response?.data?.message || 
                                error.response?.data?.error || 
                                error.response?.data?.non_field_errors?.[0] ||
                                error.response?.data?.file?.[0];
            
            if (errorMessage?.includes('virus') || errorMessage?.includes('infected')) {
                throw new Error('File appears to be infected with a virus and cannot be uploaded');
            }
            
            if (errorMessage?.includes('PDF') || errorMessage?.includes('extract')) {
                throw new Error('Could not extract text from the PDF file. Please ensure it\'s a valid PDF');
            }
            
            throw new Error(errorMessage || 'Upload failed');
        }
    },

    getUserNotes: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/study/notes/`, {
                headers: ApiService.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to view your notes');
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch notes');
        }
    },

    deleteNote: async (noteId) => {
        try {
            await axios.delete(`${BASE_URL}/api/study/notes/${noteId}/`, {
                headers: ApiService.getAuthHeaders(),
            });
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to delete notes');
            }
            throw new Error(error.response?.data?.message || 'Failed to delete note');
        }
    },

    generateSummary: async (noteId, params) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/study/notes/${noteId}/generate_content/`,
                {
                    content_type: 'summary',
                    complexity: params.complexity || 'medium',
                    language: params.language || 'English',
                    length: params.length || 'medium'
                },
                {
                    headers: ApiService.getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to generate summary');
            }
            // Handle rate limiting (daily limit reached)
            if (error.response?.status === 429) {
                throw new Error('Daily generation limit reached. Please try again tomorrow.');
            }
            
            // Handle AI generation failures
            if (error.response?.status === 500) {
                const errorMessage = error.response?.data?.error;
                if (errorMessage?.includes('Failed to generate content')) {
                    throw new Error('AI service is temporarily unavailable. Please try again in a few moments.');
                }
            }
            
            const errorMessage = error.response?.data?.error || 
                                error.response?.data?.message || 
                                'Failed to generate summary';
            
            throw new Error(errorMessage);
        }
    },

    generateFlashcards: async (noteId, params) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/study/notes/${noteId}/generate_content/`,
                {
                    content_type: 'flashcards',
                    complexity: params.complexity || 'medium',
                    language: params.language || 'English'
                },
                {
                    headers: ApiService.getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to generate flashcards');
            }
            
            if (error.response?.status === 429) {
                throw new Error('Daily generation limit reached. Please try again tomorrow.');
            }
            
            if (error.response?.status === 500) {
                throw new Error('AI service is temporarily unavailable. Please try again in a few moments.');
            }
            
            const errorMessage = error.response?.data?.error || 
                                error.response?.data?.message || 
                                'Failed to generate flashcards';
            
            throw new Error(errorMessage);
        }
    },

    generateQuiz: async (noteId, params) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/study/notes/${noteId}/generate_content/`,
                {
                    content_type: 'quiz_questions',
                    complexity: params.complexity || 'medium',
                    language: params.language || 'English'
                },
                {
                    headers: ApiService.getAuthHeaders(),
                }
            );
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Please login to generate quiz questions');
            }
            
            if (error.response?.status === 429) {
                throw new Error('Daily generation limit reached. Please try again tomorrow.');
            }
            
            if (error.response?.status === 500) {
                throw new Error('AI service is temporarily unavailable. Please try again in a few moments.');
            }
            
            const errorMessage = error.response?.data?.error || 
                                error.response?.data?.message || 
                                'Failed to generate quiz questions';
            
            throw new Error(errorMessage);
        }
    },

    // Utility method to handle common generation errors
    handleGenerationError: (error) => {
        if (error.response?.status === 401) {
            return 'Please login to generate content';
        }
        
        if (error.response?.status === 429) {
            return 'Daily generation limit reached. Please try again tomorrow.';
        }
        
        if (error.response?.status === 500) {
            const errorMessage = error.response?.data?.error;
            if (errorMessage?.includes('Failed to generate content')) {
                return 'AI service is temporarily unavailable. Please try again in a few moments.';
            }
        }
        
        return error.response?.data?.error || 
               error.response?.data?.message || 
               'Generation failed';
    },

    checkQuota: async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/study/notes/quota_status/`, {
            headers: ApiService.getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Please login to check quota');
        }
        throw new Error(error.response?.data?.message || 'Failed to check quota');
    }
},
};

// Usage example for complete PDF processing workflow
const processPDFToSummary = async (file, title, summaryParams) => {
    try {
        // Step 1: Check quota first (optional but recommended)
        const quota = await ApiService.checkQuota();
        if (quota.remaining <= 0) {
            throw new Error('Daily generation limit reached. Please try again tomorrow.');
        }
        
        // Step 2: Upload PDF
        console.log('Uploading PDF...');
        const noteData = await ApiService.uploadPDF(file, title);
        console.log('PDF uploaded successfully, Note ID:', noteData.id);
        
        // Step 3: Generate summary
        console.log('Generating summary...');
        const summaryData = await ApiService.generateSummary(noteData.id, summaryParams);
        console.log('Summary generated successfully');
        
        return {
            note: noteData,
            summary: summaryData,
            quotaRemaining: quota.remaining - 1
        };
        
    } catch (error) {
        console.error('Error processing PDF:', error.message);
        
        // You can handle specific error types here
        if (error.message.includes('virus')) {
            // Handle virus error specifically
            throw new Error('VIRUS_DETECTED: ' + error.message);
        } else if (error.message.includes('limit reached')) {
            // Handle quota error specifically
            throw new Error('QUOTA_EXCEEDED: ' + error.message);
        } else if (error.message.includes('PDF')) {
            // Handle PDF processing error
            throw new Error('PDF_ERROR: ' + error.message);
        }
        
        throw error;
    }
};

export { ApiService, processPDFToSummary };
