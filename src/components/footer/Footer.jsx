import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <a href="#home">
                <span>Alwin Godly Mathew</span>
              </a>
            </div>
            <p>MERN Stack Developer specializing in building scalable, user-friendly web and mobile applications.</p>
          </div>

          <div className="footer-social">
            <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:alwingodlymathew@gmail.com">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Alwin Godly Mathew. All Rights Reserved.</p>
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;