import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './NoteUpload.css';

const NoteUpload = () => {
    return (
        <div className="home">
            <div>
            <Header />
            </div>
            <div className='main'>
                <div className='main-header'>
                    <h1>Generate Notes</h1>
                </div>
                <div className='line'></div>
                <div className='note-container'>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default NoteUpload;
