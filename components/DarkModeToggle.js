import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark-mode');
    
    document.body.style.transition = 'background-color 0.5s, color 0.5s';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 500);
  };

  return (
    <button 
      className="control-button dark-mode-toggle" 
      onClick={toggleDarkMode} 
      aria-label="Toggle dark mode"
    >
      🌓
    </button>
  );
};

export default DarkModeToggle;