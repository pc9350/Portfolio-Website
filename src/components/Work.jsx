import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Work.css";
import img2 from "../assets/scrollhub.png";
import CO from "../assets/CO_project1.jpg";
import arrow from "../assets/arrow.svg";

export default function Work() {
  return (
    <Container fluid id="work" className="work-container">
      <Row>
        <div className="work-header">
          <h1>My Recent Works</h1>
          <p>Here are some of the projects that I have worked on:</p>
        </div>
        <div className="work-section">
          <div className="work card-1">
            <div className="work-card">
              <div className="img-box">
                <img src={CO} alt="Project 1" />
              </div>
              <a href="https://github.com/pc9350/Banking_App" target="_blank">
                <div className="project-banner">
                  <div className="project-info">
                    <span className="project-title">
                      <h3>CapitalQuest</h3>
                    </span>
                    <p className="project-description">
                      A gamified iOS banking app that merges finance with fun,
                      boosting engagement and satisfaction.
                    </p>
                  </div>
                  <img src={arrow} alt="Arrow" className="project-arrow" />
                </div>
              </a>
            </div>
          </div>
          <div className="work card-2">
            <div className="work-card">
              <div className="img-box">
                <img src={img2} alt="Project 2" />
              </div>
              <a href="https://github.com/pc9350/ScrollHub-Platform" target="_blank">
                <div className="project-banner">
                  <div className="project-info">
                    <span className="project-title">
                      <h3>ScrollHub</h3>
                    </span>
                    <p className="project-description">
                      A sleek, Material-UI driven web interface for effortless
                      navigation and seamless scrolling.
                    </p>
                  </div>
                  <img src={arrow} alt="Arrow" className="project-arrow" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
