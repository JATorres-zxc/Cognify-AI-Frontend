import React from "react";
import graduationCap from '../../../assets/images/graduation-cap.svg'
import './SignUp.css';
import SignUpForm from "../../../components/forms/SignUpForm/SignUpForm";

const SignUpPage = () => {
    return (
        <div className="signup-container">
            <img src={graduationCap} alt="Graduation Cap" className="cap" />
            <div className="signup-card">
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;