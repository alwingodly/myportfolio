import React, { useState, useRef, useEffect } from 'react';
import './Education.css';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const educationData = [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Electronics and Communication Engineering",
      institution: "College Name",
      year: "2017 – 2021",
      score: "CGPA: 7.95"
    },
    {
      degree: "Higher Secondary (12th Grade)",
      institution: "School Name",
      year: "2017",
      score: "CGPA: 7.12"
    },
    {
      degree: "Secondary School (10th Grade)",
      institution: "School Name",
      year: "2015",
      score: "CGPA: 8.6"
    }
  ];
  
  const trainingData = [
    {
      title: "MERN Stack Development",
      period: "Nov 2022 – Sept 2023",
      type: "Self-Taught Training",
      highlights: [
        "Mastered full-stack development with MERN Stack under weekly expert reviews",
        "Built E-commerce Application with SSR, Bootstrap, and AWS deployment",
        "Designed UI/UX in Figma before development",
        "Created social media app with posts, likes, comments, and friend management",
        "Developed real-time chat application using Socket.io"
      ]
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="education" className="education" ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Education & Training</h2>
          <p className="section-subtitle">Academic background and professional development</p>
        </div>
        
        {/* Education Cards */}
        <div className="education-grid">
          {educationData.map((item, index) => (
            <div 
              key={index} 
              className={`education-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <span className="year-badge">{item.year}</span>
                {item.score && <span className="score-badge">{item.score}</span>}
              </div>
              <h3 className="degree-title">{item.degree}</h3>
              {item.field && <p className="field-name">{item.field}</p>}
              <p className="institution-name">{item.institution}</p>
            </div>
          ))}
        </div>
        
        {/* Training Section */}
        <div className="training-section">
          <h3 className="subsection-title">Professional Training</h3>
          {trainingData.map((item, index) => (
            <div 
              key={index} 
              className={`training-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="training-header">
                <div className="training-info">
                  <h4 className="training-title">{item.title}</h4>
                  <span className="training-type">{item.type}</span>
                </div>
                <span className="training-period">{item.period}</span>
              </div>
              <ul className="training-highlights">
                {item.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;