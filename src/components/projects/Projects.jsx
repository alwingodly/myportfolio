import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const projects = [
    {
      id: 1,
      title: "KYC Application for IOB",
      category: "web",
      description:
        "Developed a KYC application for Indian Overseas Bank, ensuring smooth functionality and system stability using React.js.",
      technologies: ["React.js", "API Integration", "BootStrap", "javascript"],
    },
    {
      id: 2,
      title: "Form Submission for Kerala Genomic Data Center",
      category: "web",
      description:
        "Independently handled frontend development using React.js, Tailwind CSS, and React Hook Form for efficient form management.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "React Hook Form",
        "API Integration",
        "JSX"
      ],
    },
    {
      id: 3,
      title: "IOB CKYC Application",
      category: "mobile",
      description:
        "Rebuilt a complex CKYC application, redesigning the project architecture with new paths and functionalities. Integrated QR scanner for efficiency.",
      technologies: [
        "React Native",
        "QR Scanner Integration",
        "Document Upload",
        "postman",
      ],
    },
    {
      id: 4,
      title: "Document Management System Applications",
      category: "mobile",
      description:
        "Collaborated to build an overall document management application applying SOLID principles for code maintainability and scalability.",
      technologies: [
        "React Native",
        "SOLID Principles",
        "Authentication",
        "Folder Management",
        "React Native Paper",
        "Figma",
        "UI/UX",
      ],
    },
    {
      id: 5,
      title: "Task Management Application (Tasker)",
      category: "fullstack",
      description:
        "Designed and developed a task management solution using Node.js, Express.js, SSR, and MongoDB.",
      technologies: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "React js",
        "Tailwind",
        "UI/UX",
        "JWT","JSX",
        "Git"
      ],
    },
    {
      id: 6,
      title: "E-commerce Application",
      category: "fullstack",
      description:
        "Developed a full-fledged E-commerce app with SSR, Bootstrap, and complete functionalities for both admin and user.",
      technologies: [
        "MERN Stack",
        "Bootstrap",
        "AWS",
        "User Authentication",
        "JWT",
        "Server Side Rendering",
        "EJS",
        "Figma",
        "UI/UX",
        "Github"
      ],
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        <div className="project-filter">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={activeTab === "web" ? "active" : ""}
            onClick={() => setActiveTab("web")}
          >
            Web Applications
          </button>
          <button
            className={activeTab === "fullstack" ? "active" : ""}
            onClick={() => setActiveTab("fullstack")}
          >
            Full Stack
          </button>
          <button
            className={activeTab === "mobile" ? "active" : ""}
            onClick={() => setActiveTab("mobile")}
          >
            mobile
          </button>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
