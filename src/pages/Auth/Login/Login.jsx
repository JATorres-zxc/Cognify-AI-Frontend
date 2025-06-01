import React from "react";
import graduationCap from '../../../assets/images/graduation-cap.svg'
import './Login.css';
import LoginForm from "../../../components/forms/LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <div className="login-container">
            <img src={graduationCap} alt="Graduation Cap" className="cap" />
            <div className="login-card">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;