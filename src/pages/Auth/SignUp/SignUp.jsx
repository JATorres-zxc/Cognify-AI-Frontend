import React from "react";
import graduationCap from '../../../assets/images/graduation-cap.svg'
import './SignUp.css';
import LoginForm from "../../../components/forms/SignUpForm/SignUpForm";

const SignUpPage = () => {
    return (
        <div className="login-container">
            <img src={graduationCap} alt="Graduation Cap" className="cap" />
            <div className="login-card">
                
                <div className="login-header">
                    <h1>Sign Up</h1>
                </div>
                <div className="login-form">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;