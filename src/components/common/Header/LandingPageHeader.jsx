import React from 'react';
import { useNavigate } from 'react-router-dom';
import sensaiLogo from '../../../assets/images/sensai logo.png';
import toolsIcon from '../../../assets/icons/tools.svg';
import myStudyIcon from '../../../assets/icons/mystudy.svg';
import uploadIcon from '../../../assets/icons/upload.svg';
import userIcon from '../../../assets/icons/user.svg';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleButtonPress = () => {
      navigate('/login');
    }

    return (
    <div className='header'>
        <div className='content'>
            <img src={sensaiLogo} alt='SensAI Logo' className='logo' onClick={handleButtonPress} />

            <div className='search-container'></div>

            <div className='navigation'>
                <div className='nav-container' onClick={handleButtonPress}>
                    <div className='nav-icon'>
                        <img src={uploadIcon} alt='Upload' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Upload
                    </div>
                </div>

                <div className='nav-container' onClick={handleButtonPress}>
                    <div className='nav-icon'>
                        <img src={myStudyIcon} alt='MyStudy' className='icon' />
                    </div>
                    <div className='nav-text'>
                        My Study
                    </div>
                </div>

                <div className='nav-container' onClick={handleButtonPress}>
                    <div className='nav-icon'>
                        <img src={toolsIcon} alt='Tools' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Tools
                    </div>
                </div>
            </div>

            <div className='login-btn-container'>
                <button className='btn' onClick={handleButtonPress}>
                    Login
                    <img src={userIcon} alt='Login' className='login-icon' />
                </button>
            </div>
        </div>
    </div>
    );
}

export default Header;