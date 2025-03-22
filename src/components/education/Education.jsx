import React from 'react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Electronics and Communication Engineering (ECE)",
      institution: "College Name",
      year: "2017 – 2021",
      score: "CGPA: 7.95"
    },
    {
      degree: "Higher Secondary (12th Grade)",
      field: "",
      institution: "School Name",
      year: "2017",
      score: "CGPA: 7.12"
    },
    {
      degree: "Secondary School (10th Grade)",
      field: "",
      institution: "School Name",
      year: "2015",
      score: "CGPA: 8.6"
    }
  ];
  
  const trainingData = [
    {
      title: "Self-Taught Training in MERN Stack Development",
      period: "Nov 2022 – Sept 2023",
      description: [
        "Studied and mastered full-stack development with MERN Stack under weekly expert reviews.",
        "Developed an E-commerce Application with SSR, Bootstrap, and complete functionalities for both admin and user, including cart, authentication, and dashboards and host in AWS.",
        "Created Figma designs before development to plan the application UI/UX.",
        "Built a mini social media application featuring post creation, likes, comments, friend management, and profile viewing.",
        "Developed a chat application using Socket.io for real-time communication."
      ]
    }
  ];
  
  return (
    <section id="education" className="education">
      <div className="container">
        <h2>Education & Training</h2>
        
        <div className="education-timeline">
          <h3 className="section-subtitle">Academic Education</h3>
          <div className="timeline">
            {educationData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                  <h4>{item.degree}</h4>
                  {item.field && <h5>{item.field}</h5>}
                  <p>{item.institution}</p>
                  <p className="education-score">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="training-section">
          <h3 className="section-subtitle">Professional Training</h3>
          <div className="training-cards">
            {trainingData.map((item, index) => (
              <div key={index} className="training-card">
                <div className="training-period">{item.period}</div>
                <div className="training-content">
                  <h4>{item.title}</h4>
                  <ul>
                    {item.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;