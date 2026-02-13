import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const service_Id = import.meta.env.VITE_SERVICE_ID;
const template_Id = import.meta.env.VITE_TEMPLATE_ID;
const public_Key = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const form = useRef();
  const elementsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for animations
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

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    emailjs
      .sendForm(service_Id, template_Id, form.current, public_Key)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setIsSubmitting(false);
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error.text);
        setIsSubmitting(false);
        setSubmitStatus({
          success: false,
          message: "Failed to send message. Please try again later.",
        });
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        <div 
          className="section-header fade-up"
          ref={(el) => (elementsRef.current[0] = el)}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Contact Info */}
          <div 
            className="contact-info fade-up"
            ref={(el) => (elementsRef.current[1] = el)}
          >
            <div className="info-block">
              <h3 className="info-title">Let's connect</h3>
              <p className="info-description">
                I'm always open to discussing new projects, creative ideas, 
                or opportunities to contribute to your vision.
              </p>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <a 
                  href="mailto:alwingodlymathew@gmail.com" 
                  className="detail-value"
                >
                  alwingodlymathew@gmail.com
                </a>
              </div>

              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <a 
                  href="tel:+919746564270" 
                  className="detail-value"
                >
                  +91 9746564270
                </a>
              </div>

              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">Trivandrum, Kerala, India</span>
              </div>
            </div>

            {/* Social links - always visible but styled for mobile */}
            <div className="social-section">
              <span className="social-label">Connect with me</span>
              <div className="social-links">
                <a
                  href="https://github.com/alwingodly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="contact-form-wrapper fade-up"
            ref={(el) => (elementsRef.current[2] = el)}
          >
            <div className="form-container">
              
              {submitStatus.message && (
                <div
                  className={`status-message ${
                    submitStatus.success ? "status-success" : "status-error"
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}

              <form ref={form} onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name" className="field-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="field-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="field-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="field-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="subject" className="field-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="field-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="field-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={isMobile ? "5" : "6"}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;