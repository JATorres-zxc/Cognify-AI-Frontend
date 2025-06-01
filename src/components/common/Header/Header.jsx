import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import sensaiLogo from '../../../assets/images/sensai logo.png';

const LandingPageHeader = () => {
    <div className='header'>
        <img src={sensaiLogo} alt='SensAI Logo' className='logo' />

        <div className='search-container'>
            <SearchBar />
        </div>

        <div className='navigation'>

        </div>

        <div className='btn-container'>
            <button className='login-btn'>
                Login
            </button>
        </div>
    </div>
}

export default LandingPageHeader;