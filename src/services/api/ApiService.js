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
            throw new Error(error.response?.data?.message || 'Upload failed');
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
            throw new Error(error.response?.data?.message || 'Failed to generate summary');
        }
    },
};

export default ApiService;
