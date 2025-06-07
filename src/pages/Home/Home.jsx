import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/common/Header/Header';
import LandingPageHeader from '../../components/common/Header/LandingPageHeader';
import Footer from '../../components/common/Footer/Footer';
import arrow from '../../assets/icons/arrow-right.svg';
import noteUpload from '../../assets/images/note upload.png';
import fcGenerator from '../../assets/images/flashcard-generator.png';
import summarizer from '../../assets/images/summarizer.png';
import quesGenerator from '../../assets/images/question-generator.png';
import senseiAI from '../../assets/images/ai sensei.png';
import './Home.css';

const Home = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth'});
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth'});
  };
  
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleSignUpPress = () => {
    navigate('/signup');
  }
  
  return (
    <div className="home">
      <div>
        {isAuthenticated ? <Header /> : <LandingPageHeader />}
      </div>
      <div className='main'>
        <div className='main-header'>
          <h1>Learn with SensAI</h1>
          <p>Your AI powered sensei, guiding you every step of the way.</p>
        </div>

        <div className='line'></div>

        <div className='image-container'>
          <img src={senseiAI} alt="senseiAI" className='image-sensai' />
        </div>

      </div>
      <div className='features'>
        <div className='icon-cont' onClick={scrollLeft}>
          <img src={arrow} alt="left arrow" className='rotate arrow-icon' />
        </div>
        <div className='card-scroll-container' ref={scrollRef}></div>
          <div className='card-track'> 
            <div className='card-wrapper'>
              <div className='card-tilt' id='notes'></div>
              <div className='card' onClick={isAuthenticated ? () => navigate('/notes') : () => navigate('/login')}>
                Notes
              </div>
            </div>
            <div className='card-wrapper'>
              <div className='card-tilt' id='flashcards'></div>
              <div className='card' onClick={isAuthenticated ? () => navigate('/flashcards') : () => navigate('/login')}>
                Flashcards
              </div>
            </div>
            <div className='card-wrapper'>
              <div className='card-tilt' id='summaries'></div>
              <div className='card' onClick={isAuthenticated ? () => navigate('/summarizer') : () => navigate('/login')}>
                Summaries
              </div>
            </div>
            <div className='card-wrapper'>
              <div className='card-tilt' id='quizquestion'></div>
              <div className='card' onClick={isAuthenticated ? () => navigate('/quiz') : () => navigate('/login')}>
                Quiz Question
              </div>
            </div>
          </div>
          

        <div className='icon-cont' onClick={scrollRight}>
          <img src={arrow} alt="arrow" className='arrow-icon' />
        </div>
      </div>
      <div className='description'>
        <div className='all-desc-container'>
          <div className='desc-container'>
            <div className='desc-image'>
              <img src={noteUpload} alt="noteUploadIMG" className='image' />
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
              <img src={fcGenerator} alt="fcIMG" className='image' />
            </div>
          </div>

          <div className='desc-line'></div>

          <div className='desc-container'>
            <div className='desc-image'>
              <img src={summarizer} alt="summIMG" className='image' />
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
              <img src={quesGenerator} alt="qqIMG" className='image' />
            </div>
            
          </div>
        </div>
      </div>
      
      <div className='signup'>
        {isAuthenticated ? "" : 
          <div className='signup-content'>
            <div className='signup-text'>
              <h1>Join Us!</h1>
              <p>Start your journey with SensAI today!</p>
            </div>

            <div className='btn-container'>
              <button className='signup-btn' onClick={handleSignUpPress}>
                Sign Up
              </button>
            </div>
          </div>
        }
      </div>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
