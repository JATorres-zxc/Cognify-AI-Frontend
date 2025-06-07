import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { ApiService } from '../../services/api/ApiService';
import noteIcon from '../../assets/icons/note.svg';
import closeIcon from '../../assets/icons/close.svg';
import downloadIcon from '../../assets/icons/donwload.svg';
import './MyStudy.css';

const MyStudy = () => {
  const [uploads, setUploads] = useState([]);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location])

  const fetchAllData = async () => {
    try {
      // Fetch all data in parallel
      const [notesData, contentData] = await Promise.all([
        ApiService.getUserNotes(),
        ApiService.getGeneratedContent()
      ]);
      
      setUploads(notesData);
      setGeneratedContent(contentData);
      
      // Separate content by type
      setSummaries(contentData.filter(item => item.content_type === 'summary'));
      setFlashcards(contentData.filter(item => item.content_type === 'flashcards'));
      setQuizzes(contentData.filter(item => item.content_type === 'quiz_questions'));
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
      if (err.message.includes('Please login')) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await ApiService.deleteNote(noteId);
      fetchAllData(); // Refresh all data
    } catch (err) {
      if (err.message.includes('Please login')) {
        navigate('/login');
      } else {
        setError(err.message);
      }
    }
  };

  const handleDeleteGeneratedContent = async (contentId) => {
    try {
      await ApiService.deleteGeneratedContent(contentId);
      fetchAllData(); // Refresh all data
    } catch (err) {
      if (err.message.includes('Please login')) {
        navigate('/login');
      } else {
        setError(err.message);
      }
    }
  };

  const getContentTitle = (item) => {
    // Try to get title from the associated note, or use a default
    return item.note?.title || `${item.content_type} - ${new Date(item.created_at).toLocaleDateString()}`;
  };

  const getContentPreview = (item) => {
    if (item.content_type === 'summary') {
      const summaryText = item.content?.summary || item.content?.content || 'No preview available';
      return summaryText.length > 100 ? summaryText.substring(0, 100) + '...' : summaryText;
    } else if (item.content_type === 'flashcards') {
      const cardCount = Array.isArray(item.content) ? item.content.length : 0;
      return cardCount;
    } else if (item.content_type === 'quiz_questions') {
      const questionCount = Array.isArray(item.content) ? item.content.length : 0;
      return questionCount;
    }
    return 'Generated content';
  };

  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  // Handle summary card click
  const handleSummaryClick = (summary) => {
  console.log('Full summary object:', summary);
  
  let summaryContent = '';
  let title = getContentTitle(summary);
  
  try {
    // Helper function to extract summary from various content formats
    const extractSummaryContent = (content) => {
      if (!content) return 'No content available';
      
      // If content is already a plain string (not JSON), return it
      if (typeof content === 'string' && !content.trim().startsWith('{') && !content.trim().startsWith('[')) {
        return content;
      }
      
      let parsedContent;
      
      // Parse JSON if it's a string
      if (typeof content === 'string') {
        try {
          parsedContent = JSON.parse(content);
        } catch (parseError) {
          console.warn('Failed to parse content as JSON, using as plain text:', parseError);
          return content; // Return as plain text if JSON parsing fails
        }
      } else {
        parsedContent = content;
      }
      
      // Extract summary from parsed content
      if (parsedContent && typeof parsedContent === 'object') {
        // Check for summary property
        if (parsedContent.summary) {
          return parsedContent.summary;
        }
        // Check for content property
        if (parsedContent.content) {
          return parsedContent.content;
        }
        // If it's an array, join the elements
        if (Array.isArray(parsedContent)) {
          return parsedContent.join('\n');
        }
        // Convert object to readable string
        return JSON.stringify(parsedContent, null, 2);
      }
      
      return parsedContent || 'No readable content found';
    };
    
    summaryContent = extractSummaryContent(summary.content);
    
  } catch (error) {
    console.error('Error processing summary content:', error);
    summaryContent = 'Error loading summary content';
  }
  
  console.log('Final extracted content:', summaryContent);
  
  // Navigate to summary output page
  navigate('/summary-output', { 
    state: { 
      summaryData: summary,
      title: title,
      content: summaryContent
    } 
  });
  }

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
              {stats.map((stat, idx) => (
                <div className='stat-card' key={idx}>
                  <div className='stat-number'>
                    {uploads.length}
                  </div>
                  <p>Number of Files uploaded</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    {flashcards.length}
                  </div>
                  <p>Flashcard Decks created</p>
                </div>
                <div className='stat-card'>
                  <div className='stat-number'>
                    {quizzes.length}
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
            {loading ? (
              <p>Loading summaries...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : summaries.length === 0 ? (
              <p>No summaries found</p>
            ) : (
              summaries.map((summary) => (
                <div className='material-card' key={summary.id} onClick={() => handleSummaryClick(summary)}>
                  <div className='icon-container'>
                    <img src={noteIcon} alt='Summary' className='noteIcon' />
                  </div>
                  <div className='card-data'>
                    <h3 className='title'>{getContentTitle(summary)}</h3>
                    <p>{new Date(summary.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className='action-container'>
                    <div 
                      className='action-icon-container'
                      onClick={() => handleDeleteGeneratedContent(summary.id)}
                    >
                      <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                      <img src={downloadIcon} alt='View' className='downloadIcon' />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='section' id='mytests'>
          <div className='section-header'>
            My Tests
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {loading ? (
              <p>Loading quizzes...</p>
            ) : quizzes.length === 0 ? (
              <p>No quizzes found</p>
            ) : (
              quizzes.map((quiz) => (
                <div className='material-card' key={quiz.id}>
                  <div className='icon-container'>
                    <img src={noteIcon} alt='Quiz' className='noteIcon' />
                  </div>
                  <div className='card-data'>
                    <h3 className='title'>{getContentTitle(quiz)}</h3>
                    <p>No. of Questions: {getContentPreview(quiz)}</p>
                  </div>
                  <div className='action-container'>
                    <div 
                      className='action-icon-container'
                      onClick={() => handleDeleteGeneratedContent(quiz.id)}
                    >
                      <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                      <img src={downloadIcon} alt='Take Quiz' className='downloadIcon' />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='section' id='mycards'>
          <div className='section-header'>
            My Cards
            <div className='line'></div>
          </div>

          <div className='card-container'>
            {loading ? (
              <p>Loading flashcards...</p>
            ) : flashcards.length === 0 ? (
              <p>No flashcards found</p>
            ) : (
              flashcards.map((deck) => (
                <div className='material-card' key={deck.id}>
                  <div className='icon-container'>
                    <img src={noteIcon} alt='Flashcards' className='noteIcon' />
                  </div>
                  <div className='card-data'>
                    <h3 className='title'>{getContentTitle(deck)}</h3>
                    <p>No. of cards: {getContentPreview(deck)}</p>
                  </div>
                  <div className='action-container'>
                    <div 
                      className='action-icon-container'
                      onClick={() => handleDeleteGeneratedContent(deck.id)}
                    >
                      <img src={closeIcon} alt='Delete' className='closeIcon' />
                    </div>
                    <div className='action-icon-container'>
                      <img src={downloadIcon} alt='Study' className='downloadIcon' />
                    </div>
                  </div>
                </div>
              ))
            )}
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
                      onClick={() => handleDeleteNote(upload.id)}
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