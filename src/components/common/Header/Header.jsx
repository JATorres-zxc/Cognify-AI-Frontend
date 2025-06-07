import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../../services/api/ApiService';
import './Header.css';

import sensaiLogo from '../../../assets/images/sensai logo.png';
import toolsIcon from '../../../assets/icons/tools.svg';
import myStudyIcon from '../../../assets/icons/mystudy.svg';
import uploadIcon from '../../../assets/icons/upload.svg';
import userIcon from '../../../assets/icons/user.svg';
import UploadModal from '../../modals/UploadModal/UploadModal';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isNestedToolsOpen, setIsNestedToolsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toolsRef = useRef(null);
    const settingsRef = useRef(null);
    const navigate = useNavigate();
        
    const handleLogoPress = () => { navigate('/'); };
    const handleMyStudyPress = () => { navigate('/mystudy'); };
    const handleUploadPress = () => { setIsUploadModalOpen(true); };
    const toggleToolsDropdown = () => { setIsToolsOpen(prev => !prev); };

    const handleLogout = async () => {
        try {
            await ApiService.logout();
            navigate('login');
        } catch (error) {
            console.error('Logout failed: ', error.message);
        }
    };

    const handleHamburgerClick = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolsRef.current && !toolsRef.current.contains(event.target)) {
                setIsToolsOpen(false);
                setIsNestedToolsOpen(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='header'>
            <div className='content'>
                <div className="logo-row">
                    <div className="hamburger" onClick={handleHamburgerClick}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <img
                        src={sensaiLogo}
                        alt='SensAI Logo'
                        className='logo'
                        onClick= {handleLogoPress}
                    />
                </div>

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
                            <div className='dropdown-item' onClick={() => navigate('/mystudy#myuploads')}>Notes</div>
                            <div className='dropdown-item' onClick={() => navigate('/coming-soon')}>Quizzes</div>
                            <div className='dropdown-item' onClick={() => navigate('/flashcards')}>Flashcards</div>
                            <div className='dropdown-item' onClick={() => navigate('/summarizer')}>Summaries</div>
                        </div>
                    )}
                </div>
            </div>

            <div className='login-btn-container'>
                <button className='btn' onClick={handleLogout}>
                    Logout
                    <img src={userIcon} alt='Login' className='login-icon' />
                </button>
            </div>
        </div>

        {/* Mobile sidebar menu */}
            <div className={`mobile-sidebar${isMobileMenuOpen ? ' open' : ''}`}>
                <div className='sidebar-content'>
                    <button className="close-sidebar" onClick={handleHamburgerClick}>&times;</button>
                    <button className="sidebar-btn" onClick={() => { handleUploadPress(); setIsMobileMenuOpen(false); }}>
                        Upload
                    </button>
                    <button className="sidebar-btn" onClick={() => { handleMyStudyPress(); setIsMobileMenuOpen(false); }}>
                        My Study
                    </button>
                    <button className="sidebar-btn" onClick={() => { handleUploadPress(); setIsMobileMenuOpen(false); }}>
                        Notes
                    </button>
                    <button className="sidebar-btn" onClick={() => { navigate('/coming-soon'); setIsMobileMenuOpen(false); }}>
                        Quizzes
                    </button>
                    <button className="sidebar-btn" onClick={() => { handleMyStudyPress(); setIsMobileMenuOpen(false); }}>
                        Flashcards
                    </button>
                    <button className="sidebar-btn" onClick={() => { navigate('/summarizer'); setIsMobileMenuOpen(false); }}>
                        Summaries
                    </button>
                    <button className="sidebar-btn logout-btn" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ marginRight: "0.7rem", verticalAlign: "middle" }}
                        >
                            <path
                                d="M16 17L21 12M21 12L16 7M21 12H9M13 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H13"
                                stroke="var(--outline, #222)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

        <UploadModal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
        />

    </div>
    );
};

export default Header;