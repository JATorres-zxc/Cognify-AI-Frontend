import React, { useState } from 'react';
import { ApiService } from '../../../services/api/ApiService';

// import { Link } from 'react-router-dom';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import styles from './QuizGenerator.module.css'
import FileUploadModal from '../../../components/modals/FileUploadModal/FileUploadModal';
import NotesSelectionModal from '../../../components/modals/NotesSelectionModal/NotesSelectionModal';
import QuizUploadModal from '../../../components/modals/QuizUploadModal/QuizUploadModal';

const QuizGenerator = () => {
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [isNotesModalOpen, setNotesModalOpen] = useState(false);
    const [isQuizUploadModalOpen, setQuizUploadModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedQuizType, setSelectedQuizType] = useState('');
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [uploadedNote, setUploadedNote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const quizTypes = [
        { id: 'multiple_choice', label: 'Multiple Choice', className: 'outside-btn' },
        { id: 'true_false', label: 'True / False', className: 'inside-btn' },
        { id: 'short_answer', label: 'Short Answer', className: 'inside-btn' },
        { id: 'fill_blank', label: 'Fill in the Blank', className: 'outside-btn' }
    ];

    const openFileModal = () => {
        setFileModalOpen(true);
        setNotesModalOpen(false);
        setQuizUploadModalOpen(false);
    };

    const openNotesModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(true);
        setQuizUploadModalOpen(false);
    };

    const openQuizUploadModal = () => {
        setFileModalOpen(false);
        setNotesModalOpen(false);
        setQuizUploadModalOpen(true);
    };

    const handleQuizTypeSelect = (quizType) => {
        setSelectedQuizType(quizType);
        setGeneratedQuiz(null);
        setCurrentQuestions([]);
        setShowResults(false);
        setUserAnswers({});
        setError(null);
    };

    const handleNoteSelect = (note) => {
        setSelectedNote(note);
        setUploadedNote(null);
        setGeneratedQuiz(null);
        setCurrentQuestions([]);
        setError(null);
    };

    const handleQuizGenerated = (data) => {
        setUploadedNote(data.uploadedNote);
        setGeneratedQuiz(data.generatedQuiz);
        setSelectedNote(null);
        setError(null);
        parseQuizQuestions(data.generatedQuiz);
    };

    const parseQuizQuestions = (quizData) => {
        try {
            let questions = [];
            
            // Handle different possible response formats
            if (quizData.content) {
                if (typeof quizData.content === 'string') {
                    questions = parseQuizFromString(quizData.content);
                } else if (quizData.content.questions) {
                    questions = quizData.content.questions;
                } else if (Array.isArray(quizData.content)) {
                    questions = quizData.content;
                }
            } else if (quizData.questions) {
                questions = quizData.questions;
            } else if (Array.isArray(quizData)) {
                questions = quizData;
            }

            setCurrentQuestions(questions);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setShowResults(false);
        } catch (error) {
            console.error('Error parsing quiz questions:', error);
            setError('Error parsing quiz questions');
        }
    };

    const parseQuizFromString = (content) => {
        // Simple parser for string-based quiz content
        const questions = [];
        const lines = content.split('\n').filter(line => line.trim());
        
        let currentQuestion = null;
        for (const line of lines) {
            if (line.match(/^\d+\./)) {
                if (currentQuestion) questions.push(currentQuestion);
                currentQuestion = {
                    question: line.replace(/^\d+\.\s*/, ''),
                    options: [],
                    correct_answer: '',
                    type: selectedQuizType
                };
            } else if (line.match(/^[A-D]\)/)) {
                if (currentQuestion) {
                    currentQuestion.options.push(line.replace(/^[A-D]\)\s*/, ''));
                }
            }
        }
        if (currentQuestion) questions.push(currentQuestion);
        
        return questions;
    };

    const generateQuiz = async (quizParams = {}) => {
        if (!selectedNote) {
            setError('Please select a note first');
            return;
        }

        if (!selectedQuizType) {
            setError('Please select a quiz type first');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const params = {
                complexity: quizParams.complexity || 'medium',
                language: quizParams.language || 'English',
                quiz_type: selectedQuizType,
                ...quizParams
            };

            const quiz = await ApiService.generateQuiz(selectedNote.id, params);
            setGeneratedQuiz(quiz);
            parseQuizQuestions(quiz);
        } catch (err) {
            setError(err.message);
            console.error('Error generating quiz:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionIndex, answer) => {
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };

    const submitQuiz = () => {
        let correctCount = 0;
        currentQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correct_answer) {
                correctCount++;
            }
        });
        
        setScore(correctCount);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
        setScore(0);
    };

    const renderQuestion = (question, index) => {
        const isAnswered = userAnswers.hasOwnProperty(index);
        
        switch (question.type || selectedQuizType) {
            case 'multiple_choice':
                return (
                    <div className={styles['question-container']}>
                        <h3>{question.question}</h3>
                        <div className={styles['options-container']}>
                            {question.options?.map((option, optIndex) => (
                                <label key={optIndex} className={styles['option-label']}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={userAnswers[index] === option}
                                        onChange={() => handleAnswerSelect(index, option)}
                                        disabled={showResults}
                                    />
                                    <span className={styles['option-text']}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            
            case 'true_false':
                return (
                    <div className={styles['question-container']}>
                        <h3>{question.question}</h3>
                        <div className={styles['options-container']}>
                            {['True', 'False'].map((option) => (
                                <label key={option} className={styles['option-label']}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={userAnswers[index] === option}
                                        onChange={() => handleAnswerSelect(index, option)}
                                        disabled={showResults}
                                    />
                                    <span className={styles['option-text']}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            
            case 'short_answer':
            case 'fill_blank':
                return (
                    <div className={styles['question-container']}>
                        <h3>{question.question}</h3>
                        <textarea
                            className={styles['answer-input']}
                            value={userAnswers[index] || ''}
                            onChange={(e) => handleAnswerSelect(index, e.target.value)}
                            disabled={showResults}
                            placeholder="Type your answer here..."
                            rows={3}
                        />
                    </div>
                );
            
            default:
                return (
                    <div className={styles['question-container']}>
                        <h3>{question.question}</h3>
                        <p>Unsupported question type</p>
                    </div>
                );
        }
    };

    return (
        <div className={styles.home} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div>
                <Header />
            </div>
            <div className={styles.main} style={{ flex: 1 }}>
                <div className={styles["main-header"]}>
                    <h1>Quiz Title</h1>
                </div>
                <div className={styles.line}></div>
                
          {!generatedQuiz && (
                    <>
                        <div className={styles["type-selection"]}>
                            <p>Choose your type of quiz</p>
                            <div className={styles["button-grid"]}>
                                {quizTypes.map((type) => (
                                    <button 
                                        key={type.id}
                                        className={`${styles[type.className]} ${
                                            selectedQuizType === type.id ? styles.selected : ''
                                        }`}
                                        onClick={() => handleQuizTypeSelect(type.id)}
                                    >
                                        {type.label.split(' ').map((word, index) => (
                                            <span key={index}>
                                                {word}
                                                {index < type.label.split(' ').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedQuizType && (
                            <div className={styles['upload-section']}>
                                <button 
                                    className={styles['upload-btn']}
                                    onClick={() => openFileModal()}
                                >
                                    Upload Document or Select Notes
                                </button>
                            </div>
                        )}
                    </>
                )}

                {(selectedNote || uploadedNote) && selectedQuizType && !generatedQuiz && (
                    <div className={styles['selected-note']}>
                        <h3>
                            {uploadedNote ? 
                                `Uploaded: ${uploadedNote.title || 'Untitled'}` : 
                                `Selected Note: ${selectedNote.title || 'Untitled'}`
                            }
                        </h3>
                        <p>Quiz Type: {quizTypes.find(t => t.id === selectedQuizType)?.label}</p>
                        {selectedNote && (
                            <button 
                                className={styles['generate-btn']}
                                onClick={() => generateQuiz()}
                                disabled={loading}
                            >
                                {loading ? 'Generating Quiz...' : 'Generate Quiz'}
                            </button>
                        )}
                    </div>
                )}

                {error && (
                    <div className={styles['error-message']}>
                        {error}
                    </div>
                )}

                {currentQuestions.length > 0 && !showResults && (
                    <div className={styles['quiz-container']}>
                        <div className={styles['quiz-header']}>
                            <h2>Quiz: {quizTypes.find(t => t.id === selectedQuizType)?.label}</h2>
                            <p>Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
                        </div>
                        
                        {renderQuestion(currentQuestions[currentQuestionIndex], currentQuestionIndex)}
                        
                        <div className={styles['quiz-navigation']}>
                            <button 
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                disabled={currentQuestionIndex === 0}
                                className={styles['nav-btn']}
                            >
                                Previous
                            </button>
                            
                            {currentQuestionIndex < currentQuestions.length - 1 ? (
                                <button 
                                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                                    className={styles['nav-btn']}
                                >
                                    Next
                                </button>
                            ) : (
                                <button 
                                    onClick={submitQuiz}
                                    className={styles['submit-btn']}
                                    disabled={Object.keys(userAnswers).length !== currentQuestions.length}
                                >
                                    Submit Quiz
                                </button>
                            )}
                        </div>

                        <div className={styles['progress-bar']}>
                            <div 
                                className={styles['progress-fill']}
                                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {showResults && (
                    <div className={styles['results-container']}>
                        <h2>Quiz Results</h2>
                        <div className={styles['score-display']}>
                            <p>Your Score: {score} / {currentQuestions.length}</p>
                            <p>Percentage: {Math.round((score / currentQuestions.length) * 100)}%</p>
                        </div>
                        
                        <div className={styles['results-actions']}>
                            <button 
                                onClick={resetQuiz}
                                className={styles['retry-btn']}
                            >
                                Retake Quiz
                            </button>
                            <button 
                                onClick={() => {
                                    setGeneratedQuiz(null);
                                    setCurrentQuestions([]);
                                    setSelectedQuizType('');
                                    setSelectedNote(null);
                                    setUploadedNote(null);
                                }}
                                className={styles['new-quiz-btn']}
                            >
                                Create New Quiz
                            </button>
                        </div>

                        <div className={styles['detailed-results']}>
                            <h3>Review Answers</h3>
                            {currentQuestions.map((question, index) => (
                                <div key={index} className={styles['result-item']}>
                                    <h4>Question {index + 1}: {question.question}</h4>
                                    <p>Your Answer: {userAnswers[index] || 'Not answered'}</p>
                                    <p>Correct Answer: {question.correct_answer}</p>
                                    <p className={
                                        userAnswers[index] === question.correct_answer 
                                            ? styles['correct'] 
                                            : styles['incorrect']
                                    }>
                                        {userAnswers[index] === question.correct_answer ? '✓ Correct' : '✗ Incorrect'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                

        </div>

        <div>
          <Footer />
        </div>

        <FileUploadModal
                isOpen={isFileModalOpen}
                onClose={() => setFileModalOpen(false)}
                onSelectNotes={openNotesModal}
                onSelectUploadPDF={openQuizUploadModal}
        />

        <NotesSelectionModal
          isOpen={isNotesModalOpen}
          onClose={() => setNotesModalOpen(false)}
          onNoteSelect={handleNoteSelect}
        />

        <QuizUploadModal
          isOpen={isQuizUploadModalOpen}
          onClose={() => setQuizUploadModalOpen(false)}
          onQuizGenerated={handleQuizGenerated}
          selectedQuizType={selectedQuizType}
        />
      </div>
    );
};

export default QuizGenerator;
