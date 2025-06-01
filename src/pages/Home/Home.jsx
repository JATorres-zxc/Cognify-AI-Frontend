import React from 'react';
// import { Link } from 'react-router-dom';
import LandingPageHeader from '../../components/common/Header/LandingPageHeader';
import Footer from '../../components/common/Footer/Footer';
import arrow from '../../assets/icons/arrow-right.svg';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div>
        <LandingPageHeader />
      </div>
      <div className='main'>
        <div className='main-header'>
          <h1>Learn with SensAI</h1>
          <p>Your AI powered sensei, guiding you every step of the way.</p>
        </div>

        <div className='line'></div>

        <div className='image-container'>

        </div>

      </div>
      <div className='features'>
        <div className='icon-cont'>
          <img src={arrow} alt="arrow" className='rotate arrow-icon' />
        </div>
        <div className='card'>
          Notes
        </div>
        <div className='card'>
          Flashcards
        </div>
        <div className='card'>
          Summaries
        </div>

        <div className='icon-cont'>
          <img src={arrow} alt="arrow" className='arrow-icon' />
        </div>
      </div>
      <div className='description'>
        <div className='all-desc-container'>
          <div className='desc-container'>
            <div className='desc-image'>

            </div>
            <div className='desc-text'>
              <h3>Note Upload</h3>
              <p>
                Upload text or PDF notes to generate 
                quick study materials and store them for 
                easy access.
              </p>
            </div>
          </div>

          <div className='desc-line'></div>

          <div className='desc-container'>
            <div className='desc-text'>
              <h3>AI-Powered Flashcard Generator</h3>
              <p>
                Convert notes into Q&A-style flashcards
                with AI intelligence.
              </p>
            </div>
            <div className='desc-image'>
              
            </div>
          </div>

          <div className='desc-line'></div>

          <div className='desc-container'>
            <div className='desc-image'>

            </div>
            <div className='desc-text'>
              <h3>Summarization</h3>
              <p>
                Generate concise summaries of uploaded content.
              </p>
            </div>
          </div>

          <div className='desc-line'></div>

          <div className='desc-container'>
            <div className='desc-text'>
              <h3>Quiz Question Generator</h3>
              <p>
                Create multiple-choice or short-answer
                questions and scustomize them to your liking.
              </p>
            </div>
            <div className='desc-image'>
              
            </div>
            
          </div>
        </div>
      </div>
      <div className='signup'>
        <div className='signup-content'>
          <div className='signup-text'>
            <h1>Join Us!</h1>
            <p>Start your journey with SensAI today!</p>
          </div>

          <div className='btn-container'>
            <button className='signup-btn'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
