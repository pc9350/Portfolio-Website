import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Base.css';
import logo from '../assets/PClogo.png';
import { Link } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';

export default function Base() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Container fluid id="base" className="base-container">
            <Row className='base-row'>
                <div className='base-logo'>
                    <img src={logo} alt="PC logo" />
                </div>
                <div className='nav-links-list'>
                    <Link to="resume" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Resume</span></Link>
                    <Link to="work" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Work</span></Link>
                    <Link to="skills" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Skills</span></Link>
                    <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Contact</span></Link>
                </div>
                <div className="back-to-top" onClick={scrollToTop}>
                    <FaArrowUp className="arrow-icon" />
                    <span>Back to Top</span>
                </div>
            </Row>
        </Container>
    )
}