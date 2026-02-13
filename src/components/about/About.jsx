import React, { useEffect, useRef } from "react";
import "./About.css";
import profileImage from "../../assets/Profile2.png"; 
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
                Software Engineer specializing in React.js and React Native, 
                building scalable applications that solve real problems.
              </p>
            </div>

            <div 
              className="content-block fade-up"
              ref={(el) => (elementsRef.current[2] = el)}
            >
              <p className="body-text">
                Currently at Ospyn Technologies, I've delivered impactful projects 
                including the Kerala Genomic Data Center, IOB CKYC applications, 
                and document management platforms. My work focuses on clean 
                architecture, performance optimization, and creating seamless 
                user experiences.
              </p>
              <p className="body-text">
                I specialize in modern frontend development with React, Redux Toolkit, 
                and React Native, while maintaining strong fundamentals in backend 
                technologies like Node.js and Express. I'm passionate about writing 
                maintainable code using SOLID principles and collaborating with teams 
                to build products that exceed expectations.
              </p>
            </div>

            <div 
              className="info-rows fade-up"
              ref={(el) => (elementsRef.current[3] = el)}
            >
              <div className="info-row">
                <span className="info-label">Role</span>
                <span className="info-value">Software Engineer</span>
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