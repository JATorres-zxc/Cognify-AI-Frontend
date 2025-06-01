// StudyDataContext.js - Study content management
import React, { createContext, useState } from 'react';

export const StudyDataContext = createContext();

export const StudyDataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [studyStats, setStudyStats] = useState({
    filesUploaded: 0,
    flashcardsCreated: 0,
    quizzesTaken: 0
  });

  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now() }]);
    setStudyStats(prev => ({ ...prev, filesUploaded: prev.filesUploaded + 1 }));
  };

  const addFlashcardSet = (flashcardSet) => {
    setFlashcards(prev => [...prev, { ...flashcardSet, id: Date.now() }]);
    setStudyStats(prev => ({ 
      ...prev, 
      flashcardsCreated: prev.flashcardsCreated + flashcardSet.cards.length 
    }));
  };

  const addQuiz = (quiz) => {
    setQuizzes(prev => [...prev, { ...quiz, id: Date.now() }]);
    setStudyStats(prev => ({ ...prev, quizzesTaken: prev.quizzesTaken + 1 }));
  };

  const addSummary = (summary) => {
    setSummaries(prev => [...prev, { ...summary, id: Date.now() }]);
  };

  const value = {
    notes,
    flashcards,
    quizzes,
    summaries,
    studyStats,
    addNote,
    addFlashcardSet,
    addQuiz,
    addSummary
  };

  return (
    <StudyDataContext.Provider value={value}>
      {children}
    </StudyDataContext.Provider>
  );
};