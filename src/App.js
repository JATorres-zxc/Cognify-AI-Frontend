import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Import actual components
import Home from './pages/Home/Home';
import LoginPage from './pages/Auth/Login/Login';
import SignUpPage from './pages/Auth/SignUp/SignUp';
import Notes from './pages/Note/NoteUpload/NoteUpload';
import Quiz from './pages/Quiz/QuizGenerator/QuizGenerator';
import Summarizer from './pages/Summarizer/SummaryGenerator/SummaryGenerator';
import Flashcards from './pages/Flashcards/FlashcardGenerator/FlashcardGenerator';
import NoteOutput from './pages/Note/NoteOutput/NoteOutput';
import MyStudy from './pages/MyStudy/MyStudy';
import QuizOutput from './pages/Quiz/QuizOutput/QuizOutput';
import FlashcardOutput from './pages/Flashcards/FlashcardOutput/FlashcardOutput';
import SummarizerOutput from './pages/Summarizer/SummaryOutput/SummaryOutput';
// Simplified placeholder components

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/mystudy">My Study</a>
          <a href="/notes">Notes</a>
          <a href="/quiz">Quiz</a>
          <a href="/flashcards">Flashcards</a>
          <a href="/summarizer">Summarizer</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mystudy" element={<MyStudy />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="/noteoutput" element={<NoteOutput />} />
            <Route path="/quizoutput" element={<QuizOutput />} />
            <Route path="/flashcardoutput" element={<FlashcardOutput />} />
            <Route path="/summaryoutput" element={<SummarizerOutput />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;