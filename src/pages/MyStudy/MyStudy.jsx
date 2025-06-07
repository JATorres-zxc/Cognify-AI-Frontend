import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import {ApiService} from '../../services/api/ApiService';
import noteIcon from '../../assets/icons/note.svg';
import closeIcon from '../../assets/icons/close.svg';
import downloadIcon from '../../assets/icons/donwload.svg';
import './MyStudy.css';

const MyStudy = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const notes = new Array(2).fill(null);
  const tests = new Array(2).fill(null);
  const cards = new Array(2).fill(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const data = await ApiService.getUserNotes();
      setUploads(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching uploads:', err);
      if (err.message.includes('Please login')) {
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await ApiService.deleteNote(noteId);
      // Refresh the uploads list
      fetchUploads();
    } catch (err) {
      if (err.message.includes('Please login')) {
        navigate('/login');
      } else {
        setError(err.message);
      }
    }
  };

  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

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
                    {uploads.length}
                  </div>
                  <p>Number of Files uploaded</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    12
                  </div>
                  <p>Flashcard Decks created</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    8
                  </div>
                  <p>Total Quizzes <br /> taken</p>
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
            {loading ? (
              <p>Loading uploads...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : uploads.length === 0 ? (
              <p>No uploads found</p>
            ) : (
              uploads.map((upload) => (
                <div className='material-card' key={upload.id}>
                  <div className='icon-container'>
                    <img src={noteIcon} alt='Note' className='noteIcon' />
                  </div>
                  <div className='card-data'>
                    <h3 className='title'>{upload.title || 'Untitled'}</h3>
                    <p>{new Date(upload.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className='action-container'>
                    <div 
                      className='action-icon-container'
                      onClick={() => handleDelete(upload.id)}
                    >
                      <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div 
                      className='action-icon-container'
                      onClick={() => handleDownload(upload.file_url)}
                    >
                      <img src={downloadIcon} alt='Download' className='downloadIcon' />
                    </div>
                  </div>
                </div>
              ))
            )}
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