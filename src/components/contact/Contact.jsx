import React, { useState, useRef } from "react";
import "./Contact.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
const service_Id = import.meta.env.VITE_SERVICE_ID;
const template_Id = import.meta.env.VITE_TEMPLATE_ID;
const public_Key = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const form = useRef();
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
          message: "Message sent successfully! I will get back to you soon.",
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
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              Feel free to reach out for any opportunities, questions, or just
              to say hello. I'm always open to discussing new projects, creative
              ideas, or opportunities to be part of your vision.
            </p>

            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 9746564270</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>alwingodlymathew@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Kerala, India</p>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/alwingodly"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/alwin-godly-mathew-a42754217"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send Me a Message</h3>
            {submitStatus.message && (
              <div
                className={`alert ${
                  submitStatus.success ? "alert-success" : "alert-error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
