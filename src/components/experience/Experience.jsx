import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer | React Developer",
      company: "Ospyn Technologies Limited",
      period: "October, 2023 – Present",
      responsibilities: [
        "KYC Application for IOB: Troubleshoot and resolve technical issues to enhance application performance and user experience. Ensured smooth functionality and system stability as part of the development process using React.js.",
        "Form Submission Project for Kerala Genomic Data Center: Independently handled frontend development using React.js, Tailwind CSS, and React Hook Form for efficient form management. Collaborated closely with the backend team for API integration and data handling. Ensured timely delivery and successfully deployed the project into production.",
        "IOB CKYC Application: Rebuilt a complex CKYC application from an existing system, redesigning the project architecture with new paths and functionalities. Integrated QR scanner to resolve discrepancies efficiently.",
        "Ospyn Docs: Collaborated with frontend and backend teams to build the complete application. Applied SOLID principles for code maintainability and scalability. Developed navigation, authentication, and folder management features. Designed UI/UX with Figma and implemented features like listing, breadcrumb navigation, and API integrations.",
        "DDFS: Developed UI based on Figma designs and contributed to performance optimizations. Collaborated on code improvements, applying SOLID principles to enhance scalability and maintainability.",
        "Office Note: Created the viewer component, comment section, and key UI elements for seamless user interactions."
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
