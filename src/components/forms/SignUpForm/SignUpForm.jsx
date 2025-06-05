import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import ApiService from "../../../services/api/ApiService";
import './SignUpForm.css';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignUpPress = () => {
        navigate('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const data = await ApiService.register(username, email, password);
            console.log('Registration successful: ', data);

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="signup-header">
                <h1>Sign Up</h1>
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
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label className="label"> Username </label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="label"> Email </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="signup-btn" onClick={handleSignUpPress}>
                        Sign Up
                    </button>
                    <a href="/login"> Already have an account?</a>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;