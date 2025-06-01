import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

// Import actual components
import Home from './pages/Home/Home';
import LoginPage from './pages/Auth/Login/Login';
import SignUpPage from './pages/Auth/SignUp/SignUp';
import Notes from './pages/NoteUpload/NoteUpload';

// Simplified placeholder components
const Quiz = () => <div className="page">Quiz Page</div>;
const Flashcards = () => <div className="page">Flashcards Page</div>;
const Summarizer = () => <div className="page">Summarizer Page</div>;

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <a href="/">Home</a>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/summarizer" element={<Summarizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;