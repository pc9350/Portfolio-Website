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
import nextjsImg from "../assets/nextjs.svg";
import openaiImg from "../assets/openai.svg";
import firebaseImg from "../assets/firebase.svg";
import tailwindcssImg from "../assets/tailwind.svg";
import googlecloudImg from "../assets/googlecloud.svg";
import materialuiImg from "../assets/materialui.svg";

// Skill categories
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: reactImg },
      { name: "JavaScript", icon: jsImg },
      { name: "Next.js", icon: nextjsImg },
      { name: "Tailwind CSS", icon: tailwindcssImg },
      { name: "Material UI", icon: materialuiImg },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: nodeImg },
      { name: "Express.js", icon: expressImg },
      { name: "Java", icon: javaImg },
      { name: "C", icon: cImg },
    ]
  },
  {
    name: "Database & Cloud",
    skills: [
      { name: "MongoDB", icon: mongodbImg },
      { name: "MySQL", icon: mysqlImg },
      { name: "AWS", icon: awsImg },
      { name: "GCP", icon: googlecloudImg },
      { name: "Firebase", icon: firebaseImg },
    ]
  },
  {
    name: "Other Technologies",
    skills: [
      { name: "Swift", icon: swiftImg },
      { name: "UiPath", icon: uipathImg },
      { name: "Figma", icon: figmaImg },
      { name: "OpenAI", icon: openaiImg },
    ]
  }
];

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
        
        {/* Categorized Skills Section */}
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category">
            <h3 className="category-title">{category.name}</h3>
            <div className="skills-section">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill">
                  <div className="skill-card">
                    <div className="icon-box">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                  </div>
                  <p className="skill-name">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
}
