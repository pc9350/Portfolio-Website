import React, { useState, useEffect } from "react";
import "./PortfolioHome.css";
import profileImage from "../assets/me.jpg";
import resumepdf from "../assets/Pranav_Resume.pdf";
import awsCCP from "../assets/aws-ccp-badge.png"
import captionatorImage from "../assets/captionator_demo_img_1.png";
import { Button, Container, Col, Row, Modal } from "react-bootstrap";
// import { Typed } from 'react-typed';

const roles = ["Software Developer", "Web Developer", "Full Stack Developer"];

export default function PortfolioHome() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFlag, setShowFlag] = useState(true);
  const [flagBounce, setFlagBounce] = useState(false);

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

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);
  
  // Add a periodic bounce effect to the flag to draw attention
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setFlagBounce(true);
      setTimeout(() => setFlagBounce(false), 1000);
    }, 10000); // Bounce every 10 seconds
    
    return () => clearInterval(bounceInterval);
  }, []);

  const fullDescription = `Thanks for stopping by! I love bringing ideas to life through
    technology and creativity. Whether it's building seamless digital
    experiences or solving complex problems, I'm passionate about
    making things that are both useful and enjoyable. My projects
    reflect a mix of curiosity, innovation, and a commitment to doing
    meaningful work. Take a look around, and feel free to reach out if
    something sparks your interest—I'd love to connect!`;

  const shortDescription = `Passionate about bringing ideas to life through technology and creativity. 
    I build seamless digital experiences and solve complex problems with innovation and commitment.`;

  // Functions for modal control
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <>
      {/* Modern Sticky Flag */}
      {showFlag && (
        <div 
          className={`app-flag-container ${flagBounce ? 'bounce' : ''}`}
          role="button"
          aria-label="Open Captionator app info"
        >
          <div 
            className="app-flag" 
            onClick={handleModalOpen}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleModalOpen()}
          >
            <div className="flag-content">
              <span className="flag-badge">New</span>
              <span className="flag-text">Captionator</span>
              <i className="fas fa-chevron-left flag-icon"></i>
            </div>
          </div>
        </div>
      )}
      
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
              <div className="certification-badge">
                <a
                  href="https://www.credly.com/badges/e948c18a-d35b-48d2-b19d-9e29381acc39/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={awsCCP}
                    alt="AWS Certified Cloud Practitioner Badge"
                    className="aws-badge"
                  />
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

        <div className="scroll-indicator">
          <i className="fas fa-chevron-down"></i>
        </div>
      </Container>

      {/* Modern Horizontal Layout Modal for Desktop */}
      <Modal 
        show={showModal} 
        onHide={handleModalClose} 
        centered 
        size="xl"
        className="app-showcase-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-title-content">
              <span className="modal-badge">New</span>
              Captionator - AI-Powered Caption Generator
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-app-content">
            <div className="modal-app-image">
              <img src={captionatorImage} alt="Captionator App" />
              <div className="app-platforms">
                <span className="platform-badge ios">
                  <i className="fab fa-apple"></i> iOS
                </span>
                <span className="platform-badge web">
                  <i className="fab fa-android"></i> Android
                </span>
                <span className="platform-badge web">
                  <i className="fas fa-globe"></i> Web
                </span>
              </div>
            </div>
            <div className="modal-app-details">
              <h3>Key Features</h3>
              <ul>
                <li><strong>AI-Powered Generation</strong> Create engaging captions for any image or video within seconds</li>
                <li><strong>Customizable Tone</strong> Adjust the style from professional to casual, humorous, or inspirational</li>
                <li><strong>Viral Potential Scoring</strong> Get insights on how likely your caption is to engage followers</li>
                <li><strong>Caption History</strong> Save and manage your favorite captions for future use</li>
                <li><strong>Multi-Platform</strong> Available on iOS, Android, and web</li>
              </ul>
              <h3>Technology Stack</h3>
              <p>Built with React Native, OpenAI's GPT models, and cloud infrastructure for reliable performance across platforms.</p>
              <div className="modal-app-cta">
                <a href="https://apps.apple.com/us/app/captionator-caption-generator/id6743040694" target="_blank" rel="noopener noreferrer">
                  <Button variant="dark" className="app-store-btn">
                    <i className="fab fa-apple"></i> Download on App Store
                  </Button>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.captionator.app&hl=en_US" target="_blank" rel="noopener noreferrer">
                  <Button variant="success" className="play-store-btn">
                    <i className="fab fa-google-play"></i> Get it on Google Play
                  </Button>
                </a>
                <a href="https://captionator-caption-generator.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button className="web-app-btn">
                    <i className="fas fa-globe"></i> Visit Web App
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
