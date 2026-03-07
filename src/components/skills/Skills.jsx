import React from 'react';
import './Skills.css';

const Skills = () => {
  const categories = [
    {
      name: "Frontend",
      color: "var(--_colors---light-blue)",
      skills: [
        "React.js",
        "React Native",
        "Next.js",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap",
        "Redux Toolkit",
        "Zustand",
        "Context API",
        "TanStack Query",
        "Jetpack Compose",
        "Kotlin",
        "Jest"
      ]
    },
    {
      name: "Backend",
      color: "var(--_colors---light-purple)",
      skills: ["Node.js", "Express.js", "REST APIs", "MongoDB"]
    },
    {
      name: "Tools & Practices",
      color: "var(--_colors---yellow)",
      skills: [
        "Git",
        "Postman",
        "Figma",
        "VSCode",
        "Responsive Design",
        "SSR",
        "CSR",
        "SOLID Principles",
        "OOP",
        "Nx Monorepo"
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="skills-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
        </div>

        <div className="skills-categories">
          {categories.map((cat, i) => (
            <div key={i} className="skill-category">
              <h4 className="category-heading">{cat.name}</h4>
              <div className="skill-tags">
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="skill-tag"
                    style={{ backgroundColor: cat.color }}
                  >
                    {skill}
                  </span>
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
