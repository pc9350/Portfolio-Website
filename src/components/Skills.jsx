import React from "react";
import "./Skills.css";
import { Container, Row, Col } from "react-bootstrap";
import reactImg from "../assets/react.svg";
import jsImg from "../assets/js.svg";
import javaImg from "../assets/java.svg";
import swiftImg from "../assets/swift.svg";
import uipathImg from "../assets/uiPath.svg";
import cImg from "../assets/c.svg";
import nodeImg from "../assets/node-js.svg";
import mysqlImg from "../assets/mysql.svg";
import figmaImg from "../assets/figma.svg";
import awsImg from "../assets/aws.svg";
import mongodbImg from "../assets/mongoDB.svg";
import expressImg from "../assets/expressjs.svg";

export default function Skills() {
  return (
    <Container fluid id="skills" className="skills-container">
      <Row>
        <div className="skills-header">
          <h1>My Skills</h1>
          <p>
            I have a strong foundation in software development and have worked
            on a variety of projects. Here are some of the technologies that I
            have worked with:
          </p>
        </div>
        
        <div className="skills-section">
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={reactImg} alt="React" />
              </div>
            </div>
            <p className="skill-name">React</p>
          </div>
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={jsImg} alt="React" />
              </div>
           
            </div>
            <p className="skill-name">Javascript</p>
          </div>
          
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={javaImg} alt="Java icon" />
              </div>
  
            </div>
            <p className="skill-name">Java</p>
          </div>
         
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={swiftImg} alt="Swift icon" />
              </div>

            </div>
            <p className="skill-name">Swift</p>
          </div>
          
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={uipathImg} alt="uiPath icon" />
              </div>
 
            </div>

            <p className="skill-name">UiPath</p>
          </div>
          
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={cImg} alt="C icon" />
              </div>
   
            </div>
            <p className="skill-name">C</p>
          </div>
         
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={nodeImg} alt="node.js icon" />
              </div>

            </div>
            <p className="skill-name">Node.js</p>
          </div>
          
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={mysqlImg} alt="mysql icon" />
              </div>
 
            </div>
            <p className="skill-name">MySQL</p>
          </div>
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={figmaImg} alt="Figma icon" />
              </div>

            </div>
            <p className="skill-name">Figma</p>
          </div>
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={awsImg} alt="Figma icon" />
              </div>
            </div>
            <p className="skill-name">AWS</p>
          </div>
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={mongodbImg} alt="Figma icon" />
              </div>
            </div>
            <p className="skill-name">MongoDB</p>
          </div>
          <div className="skill">
            <div className="skill-card">
              <div className="icon-box">
                <img src={expressImg} alt="Figma icon" />
              </div>
            </div>
            <p className="skill-name">ExpressJS</p>
          </div>
        </div>
        
        
      </Row>
    </Container>
  );
}
