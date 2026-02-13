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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <a href="#home" onClick={closeMenu}>
              Alwin<span> Godly Mathew</span>
            </a>
          </div>

          <div 
            className="menu-toggle" 
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <div className={menuOpen ? "hamburger open" : "hamburger"}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
            <ul>
              <li><a href="#home" onClick={closeMenu}>Home</a></li>
              <li><a href="#about" onClick={closeMenu}>About</a></li>
              <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
              {/* <li><a href="#projects" onClick={closeMenu}>Projects</a></li> */}
              <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
              <li><a href="#education" onClick={closeMenu}>Education</a></li>
              <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;