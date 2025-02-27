import React from 'react';
import ProfileNavbar from './components/ProfileNavbar'
import PortfolioHome from './components/PortfolioHome'
import Contact from './components/Contact'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Work from './components/Work'
import BackToTopButton from './components/BackToTopButton';
import Base from './components/Base';
import ThemeToggle from './components/ThemeToggle';

function App() {

  return <div className='app'>
    <ProfileNavbar />
    <PortfolioHome />
    <Resume />
    <Work />
    <Skills />
    <Contact />
    <BackToTopButton />
    <ThemeToggle />
    <Base />
  </div>
}

export default App
