import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sensaiLogo from '../../../assets/images/sensai logo.png';
import toolsIcon from '../../../assets/icons/tools.svg';
import myStudyIcon from '../../../assets/icons/mystudy.svg';
import uploadIcon from '../../../assets/icons/upload.svg';
import userIcon from '../../../assets/icons/user.svg';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const toolsRef = useRef(null);
    const navigate = useNavigate();
    
    const handleLogoPress = () => {
        navigate('/');
    }

    const handleLogInPress = () => {
        navigate('/login');
    }

    const handleUploadPress = () => {
        navigate('/notes');
    }

    const handleMyStudyPress = () => {
        navigate('/mystudy');
    }

    const toggleToolsDropdown = () => {
        setIsToolsOpen(prev => !prev);
    };

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (toolsRef.current && !toolsRef.current.contains(event.target)) {
            setIsToolsOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    

    return (
    <div className='header'>
        <div className='content'>
            <img src={sensaiLogo} alt='SensAI Logo' className='logo' onClick={handleLogoPress} />

            <div className='search-container'>
                <SearchBar />
            </div>

            <div className='navigation'>
                <div className='nav-container' onClick={handleUploadPress}>
                    <div className='nav-icon'>
                        <img src={uploadIcon} alt='Upload' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Upload
                    </div>
                </div>

                <div className='nav-container' onClick={handleMyStudyPress}>
                    <div className='nav-icon'>
                        <img src={myStudyIcon} alt='MyStudy' className='icon' />
                    </div>
                    <div className='nav-text'>
                        My Study
                    </div>
                </div>

                <div
                    className='nav-container'
                    onClick={toggleToolsDropdown}
                    ref={toolsRef}
                >
                    <div className='nav-icon'>
                        <img src={toolsIcon} alt='Tools' className='icon' />
                    </div>
                    <div className='nav-text'>
                        Tools
                    </div>
                    
                    {isToolsOpen && (
                        <div className='dropdown-menu'>
                            <div className='dropdown-item'>Notes</div>
                            <div className='dropdown-item'>Quizzes</div>
                            <div className='dropdown-item'>Flashcards</div>
                            <div className='dropdown-item'>Summaries</div>
                        </div>
                    )}
                </div>
            </div>

            <div className='login-btn-container'>
                <button className='btn' onClick={handleLogInPress}>
                    Login
                    <img src={userIcon} alt='Login' className='login-icon' />
                </button>
            </div>
        </div>
    </div>
    );
}

export default Header;