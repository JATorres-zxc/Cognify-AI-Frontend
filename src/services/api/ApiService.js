const BASE_URL = 'http://localhost:8000'; // Replace with your actual backend URL

const ApiService = {
    login: async (username, password) => {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login failed');
        }

        return await response.json();
    },

    register: async (username, email, password) => {
        const response = await fetch(`${BASE_URL}/auth/registration/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password1: password,
                password2: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData?.email?.[0] || errorData?.password1?.[0] || 'Registration failed';
            throw new Error(errorMessage);
        }

        return await response.json();
    },
};

export default ApiService;
