import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import './styles/global.css';

// Import actual components
import Home from './pages/Home/Home';
import LoginPage from './pages/Auth/Login/Login';
import SignUpPage from './pages/Auth/SignUp/SignUp';
import Notes from './pages/Note/NoteOutput/NoteOutput';
import Quiz from './pages/Quiz/QuizGenerator/QuizGenerator';
import Summarizer from './pages/Summarizer/SummaryGenerator/SummaryGenerator';
import Flashcards from './pages/Flashcards/FlashcardGenerator/FlashcardGenerator';
import NoteOutput from './pages/Note/NoteOutput/NoteOutput';
import MyStudy from './pages/MyStudy/MyStudy';

// Simplified placeholder components

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">          
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
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;