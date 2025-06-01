import React from "react";
import sensaiLogo from '../../../assets/images/sensai smol logo.png';
import './Footer.css';

const Footer = () => {
    return (
    <div className="footer">
        <div className="content">
            <div className="logo-container">
                <img src={sensaiLogo} alt='SensAI Logo' className='logo' />
                <div className="text">
                    <div className="name">SensAI</div>
                    <div className="link">youremail@email.com</div>
                </div>
            </div>
            
            <div>
                <div className="icon-container">
                    <div className="contact-icon">

                    </div>
                    <div className="contact-icon">
                        
                    </div>
                    <div className="contact-icon">
                        
                    </div>
                </div>
                <div className="copyright">
                    Copyright © 2025 Survival Group
                </div>
            </div>
        </div>
    </div>
    );
}

export default Footer;