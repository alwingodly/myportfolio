import React from "react";
import "./About.css";
import profileImage from "../../assets/Profile.jpg"; 
import resume from "../../assets/Alwin_React_Developer.pdf";
const About = () => {
    
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>

        <div className="about-content">
          <div className="about-image">
          <div className="hero-image">
            <div className="shape" style={{ backgroundImage: `url(${profileImage})` }}></div>
          </div>
          </div>

          <div className="about-text">
            <p>
              I am a MERN Stack Developer with expertise in React.js and React
              Native, skilled in building scalable, user-friendly web and mobile
              applications. With experience in delivering key projects such as
              KYC solutions, form submission systems, and document management
              platforms, I bring a comprehensive understanding of both frontend
              and backend technologies.
            </p>
            <p>
              My proficiency lies in UI/UX development, performance
              optimization, and ensuring code maintainability using best
              practices like SOLID principles. As a collaborative and
              solution-oriented professional, I am passionate about creating
              impactful applications that solve real-world problems.
            </p>

            <div className="about-details">
              <div className="detail">
                <h4>Name:</h4>
                <p>Alwin Godly Mathew</p>
              </div>
              <div className="detail">
                <h4>Email:</h4>
                <p>alwingodlymathew@gmail.com</p>
              </div>
              <div className="detail">
                <h4>Phone:</h4>
                <p>+91 9746564270</p>
              </div>
              <div className="detail">
                <h4>Role:</h4>
                <p>MERN Stack Developer</p>
              </div>
            </div>

            <div className="about-cta">
              <a href={resume} className="btn">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
