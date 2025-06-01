import React, {useState} from "react";
import './SignUpForm.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Example: handle login logic
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
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
                <button type="submit" className="login-btn">
                    Log In
                </button>
                <a href="/signup"> Don't have an account?</a>
            </div>
        </form>
    );
}

export default SignUpForm;