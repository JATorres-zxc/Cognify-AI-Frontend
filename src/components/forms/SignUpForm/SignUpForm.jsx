import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignUpPress = () => {
        navigate('/login');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Example: handle login logic
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="form-container">
            <div className="signup-header">
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label className="label"> Username </label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
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