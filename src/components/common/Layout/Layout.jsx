import React from 'react';
import './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>SensAI</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/my-study">My Study</a>
          <button>Logout</button>
        </nav>
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;