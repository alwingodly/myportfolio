import React, { useEffect, useRef } from 'react';
import './Hero.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ThreeScene from './ThreeScene';

const Hero = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Three.js canvas — full background */}
      <div className="hero-canvas">
        <ThreeScene mousePos={mousePos} />
      </div>

      {/* Subtle colour tint orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />
      <div className="hero-orb hero-orb-4" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          {/* ── Left: text content ── */}
          <div className="hero-content">
            <div className="hero-meta">
              <span className="hero-label">MERN Stack Developer</span>
              <span className="hero-avail">Available for work</span>
            </div>

            <h1 className="hero-heading">
              <span className="c-white">Alwin</span><br />
              <span className="c-blue">Godly</span><br />
              Mathew
            </h1>

            <p className="hero-desc">
              Building scalable, user-friendly web &amp; mobile
              applications with React.js and React Native.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
              <div className="hero-social">
                <a href="https://github.com/alwingodly" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="mailto:alwingodlymathew@gmail.com" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: 3D scene shows through ── */}
          <div className="hero-visual" aria-hidden="true" />
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
};

export default Hero;
