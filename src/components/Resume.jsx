import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Resume.css";

export default function Resume() {
  return (
    <Container fluid id="resume" className="resume-container">
      <Row>
        <Col md={6} sm={12} className="resume-section education">
          <h1>
            <i className="fa-solid fa-graduation-cap icon"></i>My Education
          </h1>
          <div className="resume-card UW">
            <p className="date">January 2022 - May 2024</p>
            <h2>Bachelor of Science in Computer Science</h2>
            <h3 className="uw-madison">University of Wisconsin, Madison</h3>
            <p className="coursework">
              <em>
                Relevant Coursework: Data Structures (CS 300, 400), Algorithms
                (CS 577), Intro to Operating Systems (CS 537), Building User
                Interfaces(CS 571)
              </em>
            </p>
          </div>
          <div className="resume-card MUJ">
            <p className="date">September 2019 - December 2021</p>
            <h2>Bachelor of Technology in <br />CCE</h2>
            <h3 className="manipal">Manipal University, Jaipur (transferred to UW)</h3>

            <p className="coursework">
              <em>
                Relevant Coursework: Object-Oriented Programming, Database
                Management Systems
              </em>
            </p>
          </div>
        </Col>
        <Col md={6} sm={12} className="resume-section experience">
          <h1>
            <i className="fa-solid fa-briefcase icon"></i>My Experience
          </h1>
          <div className="resume-card CO">
            <p className="date">September 2023 - December 2023</p>
            <h2>App Developer lead & Scrum Master</h2>
            <h3>Capital One</h3>
            <p className="tech-stack">
                <em>
                    Tech-Stack: Swift, FIgma, MongoDB, Node.js, Agile Methodologies, JIRA
                </em>
                    </p>
                    {/* <p><em>Project: Video game induced in a Banking App</em></p> */}
          </div>
          <div className="resume-card AIRO">
            <p className="date">June 2022 - August 2022</p>
            <h2>RPA Intern</h2>
            <h3>AiRo Digital Labs</h3>
            <p className="tech-stack"><em>Tech-Stack: UiPath, VB.net, RE Framework</em></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
