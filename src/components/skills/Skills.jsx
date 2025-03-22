import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend Technologies",
      skills: [
        { name: "React.js", level: 90 },
        { name: "React Native", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "Bootstrap", level: 85 },
        { name: "Tailwind CSS", level: 82 },
        { name: "Next.js", level: 75 }
      ]
    },
    {
      category: "Backend Technologies",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 78 },
        { name: "REST APIs", level: 85 },
        { name: "Postman", level: 90 }
      ]
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "MongoDB", level: 82 },
        { name: "Redux", level: 80 },
        { name: "Git", level: 85 },
        { name: "Figma", level: 75 },
        { name: "VSCode", level: 95 }
      ]
    },
    {
      category: "Development Practices",
      skills: [
        { name: "SOLID Principles", level: 80 },
        { name: "Server-Side Rendering", level: 75 },
        { name: "Client-Side Rendering", level: 85 },
        { name: "NX Packaging", level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>My Skills</h2>
        
        <div className="skills-container">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skill-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;