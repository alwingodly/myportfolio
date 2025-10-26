import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer | React Developer",
      company: "Ospyn Technologies Limited",
      period: "October, 2023 – Present",
      responsibilities: [
        "KYC Web Application: Troubleshot and resolved technical issues to enhance performance and user experience using React.js, ensuring smooth functionality and system stability.",
        "CKYC Web Application: Rebuilt a complex system, redesigning architecture with new paths and functionalities; integrated QR scanner to streamline verification.",
        "Genomic Data Management Web Application: Independently handled frontend development using React.js, Tailwind CSS, and React Hook Form; collaborated with backend teams for API integration and successful deployment.",
        "Document Management Application 1: Developed full application with navigation, authentication, folder management, listing, breadcrumb navigation, and API integrations; applied SOLID principles for maintainability.",
        "Document Management Application 2: Developed UI based on Figma designs; optimized performance and code quality using SOLID principles.",
        "Annotation Viewer Module: Independently built an annotation viewer using Jetpack Compose and integrated with React Native; implemented drawing, zooming, panning, swipe navigation, and created two functional variants.",
        "Office Note Module: Created viewer components, comment sections, and key UI elements for seamless user interactions.",
        "Banking Frontend Contribution: Contributed briefly to frontend integration and debugging to support secure and efficient application functionality."
      ]
    },
    {
      title: "Associate Software Engineer",
      company: "Open Leaves",
      period: "January 2022 - October, 2022",
      responsibilities: [
        "Portfolio Website: Developed a responsive portfolio site for a startup company using HTML, CSS, JavaScript, and Bootstrap.",
        "Task Management Application (Tasker): Collaborated with the team to design and develop a task management solution using Node.js, Express.js, SSR, and MongoDB. Contributed to back-end logic, database integration, and efficient task handling for the company's internal project."
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Work Experience</h2>

        <div className="timeline-exp">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item-exp ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content-exp">
                <div className="date">{exp.period}</div>
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <ul>
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
