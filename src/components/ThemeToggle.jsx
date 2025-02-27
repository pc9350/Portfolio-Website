import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-btn"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'light' ? (
          <i className="fas fa-moon" title="Switch to dark mode"></i>
        ) : (
          <i className="fas fa-sun" title="Switch to light mode"></i>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle; 