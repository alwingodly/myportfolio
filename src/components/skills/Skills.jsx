import React, { useState, useRef, useEffect } from 'react';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React.js", level: 90 },
        { name: "React Native", level: 85 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "JavaScript", level: 88 },
        { name: "Tailwind CSS", level: 82 },
        { name: "Bootstrap", level: 85 },
        { name: "Next.js", level: 75 },
      ]
    },
    {
      category: "Backend",
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
        { name: "VS Code", level: 95 }
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

  // Mobile: Tag Cloud
  if (isMobile) {
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    
    return (
      <section id="skills" className="skills-simple mobile" ref={sectionRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
          </div>

          <div className={`skills-cloud ${isVisible ? 'visible' : ''}`}>
            {allSkills.map((skill, index) => (
              <div
                key={index}
                className="skill-pill"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <span className="pill-name">{skill.name}</span>
                <span className="pill-level">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Simple Professional Cards
  return (
    <section id="skills" className="skills-simple desktop" ref={sectionRef}>
      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Simple Tabs */}
        <div className="category-tabs">
          {skillCategories.map((category, index) => (
            <button
              key={index}
              className={`tab-button ${activeCategory === index ? 'active' : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-content">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`skills-grid ${activeCategory === catIndex ? 'active' : ''}`}
            >
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className={`skill-item ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${skillIndex * 0.05}s` }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress"
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;