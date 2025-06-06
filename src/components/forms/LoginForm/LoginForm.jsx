import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(username, password);
            if (result.success) {
                // Redirect to dashboard or home page
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='form-container'>
            <div className="login-header">
                <h1>Login</h1>
            </div>
            {error && (
                <div className="error-message" style={{
                    color: 'red', 
                    marginBottom: '15px', 
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label className="label"> Username </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="label"> Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        disabled={loading}
                    />
                </div>

                <div className="btn-container">
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                    <a href="/signup"> Don't have an account?</a>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;