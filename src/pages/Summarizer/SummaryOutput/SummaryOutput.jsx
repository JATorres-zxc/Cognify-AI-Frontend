import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './SummaryOutput.module.css';

const SummaryOutput = () => {
    const [summaryData, setSummaryData] = useState(null);
    const [title, setTitle] = useState('Summary');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.summaryData) {
            const { summaryData: data, title: summaryTitle, content: summaryContent } = location.state;
            
            setSummaryData(data);
            setTitle(summaryTitle || 'Summary');
            
            // Process the content
            const processedContent = processContent(summaryContent, data);
            setContent(processedContent);
            
        } else {
            // If no data is passed, redirect back to MyStudy
            console.warn('No summary data found in navigation state');
            navigate('/my-study');
            return;
        }
        
        setLoading(false);
    }, [location.state, navigate]);

    const processContent = (summaryContent, fallbackData) => {
    const extractFromCodeBlock = (text) => {
        const match = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (match && match[1]) {
            try {
                const parsed = JSON.parse(match[1]);
                return parsed.summary || JSON.stringify(parsed, null, 2);
            } catch (e) {
                console.error('Error parsing JSON from code block:', e);
                return text; // fallback to raw content
            }
        }
        return text;
    };

    if (summaryContent && typeof summaryContent === 'string' && summaryContent.trim()) {
        return extractFromCodeBlock(summaryContent.trim());
    }

    // Fallback: try to extract from the original data
    if (fallbackData && fallbackData.content) {
        try {
            let parsedContent;

            if (typeof fallbackData.content === 'string') {
                // Try to parse as JSON
                try {
                    parsedContent = JSON.parse(fallbackData.content);
                } catch (e) {
                    // Might be code block JSON, try extract
                    return extractFromCodeBlock(fallbackData.content);
                }
            } else {
                parsedContent = fallbackData.content;
            }

            if (parsedContent && typeof parsedContent === 'object') {
                if (parsedContent.summary) {
                    return parsedContent.summary;
                }
                if (parsedContent.content) {
                    return parsedContent.content;
                }
                return JSON.stringify(parsedContent, null, 2);
            }

            return parsedContent || 'No content available';
        } catch (error) {
            console.error('Error processing fallback content:', error);
            return 'Error loading content';
        }
    }

    return 'No content available';
};

    const formatContent = (text) => {
        if (!text || typeof text !== 'string') {
            return <p>No content to display</p>;
        }
        
        // Handle different paragraph separators
        const paragraphs = text.split(/\n\s*\n|\r\n\s*\r\n/).filter(p => p.trim());
        
        if (paragraphs.length === 0) {
            // If no double line breaks, split by single line breaks
            const lines = text.split(/[\n\r]/).filter(line => line.trim());
            return lines.map((line, index) => (
                <p key={index} className={styles["paragraph"]}>{line}</p>
            ));
        }
        
        return paragraphs.map((paragraph, index) => (
            <p key={index} className={styles["paragraph"]}>{paragraph.trim()}</p>
        ));
    };

    const handleDownload = () => {
        // Create a downloadable text file
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className={styles["home"]}>
                <Header />
                <div className={styles["main"]}>
                    <p>Loading summary...</p>
                </div>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className={styles["home"]}>
          <div>
            <Header />
          </div>

          <div className={styles["main"]}>
            <div className={styles["main-header"]}>
              <h1>{title}</h1>
            </div>
            <div className={styles["line"]}></div>


            <div className={styles["note-container"]}>
              <div className={styles["summary-content"]}>
                {content ? formatContent(content) : <p>No content available</p>}
              </div>
            </div>

            <div className={styles["actions"]}>
              <button 
                className={styles["back-button"]}
                onClick={() => navigate('/mystudy')}
              >
                Back to My Study
              </button>
              <button 
                className={styles["download-btn"]}
                onClick={handleDownload}
              >
                Download Summary
              </button>
            </div>  
          </div>

          <div>
            <Footer />
          </div>
        </div>
    );
};

export default SummaryOutput;
