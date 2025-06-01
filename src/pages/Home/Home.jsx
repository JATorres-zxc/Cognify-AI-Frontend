import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero text-center mb-20">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
        <h1>Learn with SensAI</h1>
        <p>Your AI-powered study companion making learning easy every step of the way</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <Link to="/notes" style={{ textDecoration: 'none' }}>
          <div className="card text-center">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
            <h3>Notes</h3>
          </div>
        </Link>
        
        <Link to="/flashcards" style={{ textDecoration: 'none' }}>
          <div className="card text-center">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎴</div>
            <h3>Flashcards</h3>
          </div>
        </Link>
        
        <Link to="/summarizer" style={{ textDecoration: 'none' }}>
          <div className="card text-center">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
            <h3>Summarizer</h3>
          </div>
        </Link>
      </div>

      <div className="text-center">
        <h2>Join Us!</h2>
        <p>Start your AI-enhanced learning journey today</p>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
