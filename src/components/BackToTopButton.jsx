import React, { useState, useEffect } from 'react';
import './BackToTopButton.css'; 

const BackToTopButton = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
  
    useEffect(() => {
      const onScroll = () => {
        const scrolled = document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrolled > 10) setShowTopBtn(true); else setShowTopBtn(false);
        setScrollProgress((scrolled / maxScroll) * 100);
      };
  
      window.addEventListener("scroll", onScroll);
  
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
  
    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
  if (!showTopBtn) return null;

  return showTopBtn && (
    <div className="top-to-btm" onClick={goToTop}>
          <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" strokeWidth="2" fill="transparent" stroke="#462b80"></circle>
            <circle className="circle-progress" opacity="0.7" cx="25" cy="25" r="20" strokeWidth="2" fill="transparent" strokeDasharray="125.6" strokeDashoffset={`${125.6 - (scrollProgress / 100) * 125.6}`}></circle>
            <text x="50%" y="50%" textAnchor="middle" fill="#8751f7" className='arrow' dy=".3em">↑</text>
          </svg>
        </div>
  );
};

export default BackToTopButton;
