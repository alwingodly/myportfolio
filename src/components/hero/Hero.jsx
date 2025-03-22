import React, { useEffect } from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import profileImage from '../../assets/Profile.jpg';

const Hero = () => {
  useEffect(() => {
    const starsContainer = document.querySelector('.stars');

    const createStars = () => {
      const starCount = 100; 

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('span');
        const size = Math.random() * 3 + 1; 
        const duration = Math.random() * 5 + 2;
        const delay = Math.random() * 5; 

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
      }
    };

    const createShootingStars = () => {
      const shootingStarCount = 3; 

      for (let i = 0; i < shootingStarCount; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(shootingStar);
      }
    };

    createStars();
    createShootingStars();

    return () => {
      starsContainer.innerHTML = ''; 
    };
  }, []); 

  return (
    <section id="home" className="hero">
      <div className="stars"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm <span>Alwin Godly Mathew</span></h1>
            <h3>MERN Stack Developer</h3>
            <p>I build scalable, user-friendly web and mobile applications with React.js and React Native.</p>
            
            <div className="hero-buttons">
              <a href="#contact" className="btn">Get In Touch</a>
              <a href="#projects" className="btn btn-outline">View My Projects</a>
            </div>
            
            <div className="social-links">
              <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="mailto:alwingodlymathew@gmail.com"><FaEnvelope /></a>
            </div>
          </div>
          
          {/* <div className="hero-image-hero">
            <div className="shape-hero" style={{ backgroundImage: `url(${profileImage})` }}></div>
          </div> */}
        </div>
      </div>
      
      <div className="hero-scroll">
        <a href="#about">
          <div className="mouse"></div>
        </a>
      </div>
    </section>
  );
};

export default Hero;