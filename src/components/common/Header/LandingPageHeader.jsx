import React from 'react';
import sensaiLogo from '../../../assets/images/sensai logo.png';
import toolsIcon from '../../../assets/icons/tools.svg';
import myStudyIcon from '../../../assets/icons/mystudy.svg';
import uploadIcon from '../../../assets/icons/upload.svg';
import userIcon from '../../../assets/icons/user.svg';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

const LandingPageHeader = () => {
    return (
    <div className='header'>
        <div className='content'>
            <img src={sensaiLogo} alt='SensAI Logo' className='logo' />

            <div className='search-container'>
                <SearchBar />
            </div>

            <div className='navigation'>
                <div className='nav-container'>
                    <div className='nav-icon'>
                        <img src={uploadIcon} alt='Upload' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Upload
                    </div>
                </div>

                <div className='nav-container'>
                    <div className='nav-icon'>
                        <img src={myStudyIcon} alt='MyStudy' className='icon' />
                    </div>
                    <div className='nav-text'>
                        My Study
                    </div>
                </div>

                <div className='nav-container'>
                    <div className='nav-icon'>
                        <img src={toolsIcon} alt='Tools' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Tools
                    </div>
                </div>
            </div>

            <div className='login-btn-container'>
                <button className='btn'>
                    Login
                    <img src={userIcon} alt='Login' className='login-icon' />
                </button>
            </div>
        </div>
    </div>
    );
}

export default LandingPageHeader;