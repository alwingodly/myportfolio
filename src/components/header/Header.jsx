import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <a href="#home">Alwin<span> Godly Mathew</span></a>
          </div>
          
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={menuOpen ? "hamburger open" : "hamburger"}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
            <ul>
              <li><a href="#home" onClick={toggleMenu}>Home</a></li>
              <li><a href="#about" onClick={toggleMenu}>About</a></li>
              <li><a href="#experience" onClick={toggleMenu}>Experience</a></li>
              <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
              <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
              <li><a href="#education" onClick={toggleMenu}>Education</a></li>
              <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;