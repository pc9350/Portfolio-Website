import React, {useState, useEffect} from "react";
import "./PortfolioHome.css";
import profileImage from "../assets/me.jpg";
import resumepdf from "../assets/Pranav_Resume.pdf";
import { Button, Container, Col, Row } from "react-bootstrap";
// import { Typed } from 'react-typed';

const roles = ['Software Developer', 'Web Developer', 'Full Stack Developer'];

export default function PortfolioHome() {

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayText !== currentRole) {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
    } else if (isDeleting && displayText !== '') {
      timer = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    } else if (displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <Container fluid className="home-div">
      <Row className="align-items-row">
        <Col md={6} className="text-content">
          <div className="breathing-text">HI</div>
          <div className="overlay-content">
            <h1>I am Pranav</h1>
            <h2>{displayText}<span className="cursor">|</span></h2>
            <p>
              With a blend of leadership in app development and a knack for
              innovative solutions, I turn bold ideas into reality. Explore the
              intersection of technology and creativity through my work.
            </p>

            <div className="hero-stn-icons">
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
              <a href="https://www.linkedin.com/in/pranavchhabra/" target="_blank">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/pc9350" target="_blank">
                <i className="fa-brands fa-github"></i>
              </a>
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
    </Container>
  );
}
