import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Work.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/scrollhub.png";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.png";
import CO from "../assets/CO_project.jpg";
import arrow from "../assets/arrow.svg";

export default function Work() {
  return (
    <Container fluid id="work" className="work-container">
      <Row>
        <div className="work-header">
          <h1>My Recent Works</h1>
          <p>
            I have worked on a variety of projects. Here are some of the
            projects that I have worked on:
          </p>
        </div>
        <div className="work-section">
          <div className="work card-1">
            <div className="work-card">
              <div className="icon-box">
                <img src={CO} alt="Project 1" />
              </div>
              <div className="project-banner">
                <div className="project-info">
                <span className="project-title"><h3>Project 1</h3></span>
                  <p className="project-description">
                    A brief description of Project 1.
                  </p>
                </div>
                <img src={arrow} alt="Arrow" className="project-arrow" />
              </div>
            </div>
          </div>
          <div className="work card-2">
            <div className="work-card">
              <div className="icon-box">
                <img src={img2} alt="Project 2" />
              </div>
              <div className="project-banner">
                <div className="project-info">
                <span className="project-title"><h3>Project 2</h3></span>
                  <p className="project-description">
                    A brief description of Project 2.
                  </p>
                </div>
                <img src={arrow} alt="Arrow" className="project-arrow" />
              </div>
            </div>
          </div>
          <div className="work card-3">
            <div className="work-card">
              <div className="icon-box">
                <img src={img2} alt="Project 3" />
              </div>
              <div className="project-banner">
                <div className="project-info">
                <span className="project-title"><h3>Project 3</h3></span>
                  <p className="project-description">
                    A brief description of Project 3.
                  </p>
                </div>
                <img src={arrow} alt="Arrow" className="project-arrow" />
              </div>
            </div>
          </div>
          <div className="work card-4">
            <div className="work-card">
              <div className="icon-box">
                <img src={img3} alt="Project 4" />
              </div>
              <div className="project-banner">
                <div className="project-info">
                  <span className="project-title"><h3>Project 4</h3></span>
                  <p className="project-description">
                    A brief description of Project 4.
                  </p>
                </div>
                <img src={arrow} alt="Arrow" className="project-arrow" />
              </div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}
