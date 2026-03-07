import React, { useEffect, useRef } from "react";
import "./About.css";
import profileImage from "../../assets/Profile.png"; 
import resume from "../../assets/Alwin_React_Developer.pdf";

const About = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        
        <div className="about-grid">
          
          {/* Image Column */}
          <div 
            className="about-image-col fade-up"
            ref={(el) => (elementsRef.current[0] = el)}
          >
            <div className="image-wrapper">
              <img 
                src={profileImage} 
                alt="Alwin Godly Mathew" 
                className="profile-img"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content-col">
            
            <div 
              className="content-block fade-up"
              ref={(el) => (elementsRef.current[1] = el)}
            >
              <span className="section-label">About</span>
              <h2 className="section-title">Alwin Godly Mathew</h2>
              <p className="lead-text">
                Frontend Developer with 3+ years of experience in React.js and
                React Native, focused on scalable architecture, performance,
                and cross-platform product delivery.
              </p>
            </div>

            <div 
              className="content-block fade-up"
              ref={(el) => (elementsRef.current[2] = el)}
            >
              <p className="body-text">
                At Ospyn Technologies, I led frontend delivery for Kerala
                Genomic Data Center and built enterprise-grade KYC/CKYC and
                document management applications using React.js, Redux Toolkit,
                Tailwind CSS, and React Native.
              </p>
              <p className="body-text">
                I specialize in state management, REST API integration,
                responsive UI/UX, and SOLID-based engineering practices, with
                working backend knowledge in Node.js, Express.js, and MongoDB.
              </p>
            </div>

            <div 
              className="info-rows fade-up"
              ref={(el) => (elementsRef.current[3] = el)}
            >
              <div className="info-row">
                <span className="info-label">Role</span>
                <span className="info-value">Software Engineer (Frontend)</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <a href="mailto:alwingodlymathew@gmail.com" className="info-value info-link">
                  alwingodlymathew@gmail.com
                </a>
              </div>
              <div className="info-row">
                <span className="info-label">Phone</span>
                <a href="tel:+919746564270" className="info-value info-link">
                  +91 9746564270
                </a>
              </div>
              <div className="info-row">
                <span className="info-label">Location</span>
                <span className="info-value">Trivandrum, Kerala</span>
              </div>
            </div>

            <div 
              className="about-actions fade-up"
              ref={(el) => (elementsRef.current[4] = el)}
            >
              <a href={resume} download className="btn btn-primary">
                Download Resume
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in Touch
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
