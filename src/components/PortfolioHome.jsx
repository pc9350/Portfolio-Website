import React, { useState, useEffect } from "react";
import "./PortfolioHome.css";
import profileImage from "../assets/me.jpg";
import resumepdf from "../assets/Pranav_Resume.pdf";
import { Button, Container, Col, Row } from "react-bootstrap";
// import { Typed } from 'react-typed';

const roles = ["Software Developer", "Web Developer", "Full Stack Developer"];

export default function PortfolioHome() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
    } else if (isDeleting && displayText !== "") {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    } else if (displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const fullDescription = `Thanks for stopping by! I love bringing ideas to life through
    technology and creativity. Whether it's building seamless digital
    experiences or solving complex problems, I'm passionate about
    making things that are both useful and enjoyable. My projects
    reflect a mix of curiosity, innovation, and a commitment to doing
    meaningful work. Take a look around, and feel free to reach out if
    something sparks your interest—I'd love to connect!`;

  const shortDescription = `Passionate about bringing ideas to life through technology and creativity. 
    I build seamless digital experiences and solve complex problems with innovation and commitment.`;

  return (
    <Container fluid className="home-div">
      <Row className="align-items-row">
        <Col md={6} className="text-content">
          <div className="breathing-text">HI</div>
          <div className="overlay-content">
            <h1>I am Pranav</h1>
            <div className="typing-wrapper">
              <h2 className="typing-container">
                <span className="typing-text">{displayText}</span>
                <span className="cursor">|</span>
              </h2>
            </div>
            <p className="full-description">{fullDescription}</p>
            <p className="short-description">{shortDescription}</p>

            <div className="hero-actions">
              <a
                href={resumepdf}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-download-link"
              >
                <Button variant="primary" className="cv-download">
                  Download CV
                  <i className="fa-solid fa-download"></i>
                </Button>
              </a>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/pranavchhabra/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/pc9350"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} className="profile-picture">
          <img
            src={profileImage}
            alt="a photo of Pranav"
            className="my-photo"
          />
        </Col>
      </Row>

      <div className="scroll-indicator">
        <i className="fas fa-chevron-down"></i>
      </div>
    </Container>
  );
}
