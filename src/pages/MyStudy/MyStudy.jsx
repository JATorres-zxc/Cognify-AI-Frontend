import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import noteIcon from '../../assets/icons/note.svg';
import closeIcon from '../../assets/icons/close.svg';
import downloadIcon from '../../assets/icons/donwload.svg';
import './MyStudy.css';

const MyStudy = () => {
  const notes = new Array(8).fill(null);
  const tests = new Array(4).fill(null);
  const cards = new Array(7).fill(null);
  const uploads = new Array(6).fill(null);
  
  return (
    <div className='mystudy'>
      <div>
        <Header />
      </div>
      
      <div className='main'>
        <div className='stats'>
          <div className='stats-header'>
            <h1>My Stats</h1>
            <div className='line'></div>
          </div>

          <div className='body'>
            <div className='content'>
                <div className='stat-card'>
                  <div className='stat-number'>
                    55
                  </div>
                  <p>Number of files uploaded</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    12
                  </div>
                  <p>Flashcard decks created</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    8
                  </div>
                  <p>Total Quizzes taken</p>
                </div>
            </div>
            <div className='progress'>
                <h1>Average Test Performance</h1>
                <div className='performance-bar-container'>
                  <div className='progress-bar-fill' style={{ width: `90%` }}>
                    <span className='progress-text'>
                      90%
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='materials'>
        <div className='section' id='mynotes'>
          <div className='section-header'>
            My Notes
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {notes.map((_, idx) => (
                <div className='material-card' key={idx}>
                <div className='icon-container'>
                    <img src={noteIcon} alt='Note' className='noteIcon' />
                </div>
                <div className='card-data'>
                    <h3 className='title'>Notes Title</h3>
                    <p>Date Created</p>
                </div>
                <div className='action-container'>
                    <div className='action-icon-container'>
                    <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                    <img src={downloadIcon} alt='Download' className='downloadIcon' />
                    </div>
                </div>
                </div>
            ))}
          </div>
        </div>

        <div className='section' id='mytests'>
          <div className='section-header'>
            My Tests
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {tests.map((_, idx) => (
                <div className='material-card' key={idx}>
                <div className='icon-container'>
                    <img src={noteIcon} alt='Note' className='noteIcon' />
                </div>
                <div className='card-data'>
                    <h3 className='title'>Test Title</h3>
                    <p>No. of Questions: </p>
                </div>
                <div className='action-container'>
                    <div className='action-icon-container'>
                    <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                    <img src={downloadIcon} alt='Download' className='downloadIcon' />
                    </div>
                </div>
                </div>
            ))}
          </div>
        </div>

        <div className='section' id='mycards'>
          <div className='section-header'>
            My Cards
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {cards.map((_, idx) => (
                <div className='material-card' key={idx}>
                <div className='icon-container'>
                    <img src={noteIcon} alt='Note' className='noteIcon' />
                </div>
                <div className='card-data'>
                    <h3 className='title'>Deck Title</h3>
                    <p>No. of Cards: </p>
                </div>
                <div className='action-container'>
                    <div className='action-icon-container'>
                    <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                    <img src={downloadIcon} alt='Download' className='downloadIcon' />
                    </div>
                </div>
                </div>
            ))}
          </div>
        </div>

        <div className='section' id='myuploads'>
          <div className='section-header'>
            My Uploads
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {uploads.map((_, idx) => (
                <div className='material-card' key={idx}>
                <div className='icon-container'>
                    <img src={noteIcon} alt='Note' className='noteIcon' />
                </div>
                <div className='card-data'>
                    <h3 className='title'>Doc Title</h3>
                    <p>Date Uploaded</p>
                </div>
                <div className='action-container'>
                    <div className='action-icon-container'>
                    <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                    <img src={downloadIcon} alt='Download' className='downloadIcon' />
                    </div>
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyStudy;