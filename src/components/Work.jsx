import React from "react";
import { Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Work.css";
import img2 from "../assets/scrollhub.png";
import CO from "../assets/CO_project1.jpg";
import calmify from "../assets/calmify.png";
import pantry from "../assets/pantrypal.png";
import profscore from "../assets/profscore.jpg";
import intelliAid from "../assets/IntelliAid.png";
import phonicsjoy from "../assets/Phonicsjoy.png";
import arrow from "../assets/arrow.svg";
import githubIcon from "../assets/github.svg";
import linkIcon from "../assets/link.svg";

const projects = [
  {
    title: "Profscore",
    description: "An AI-driven platform that allows students to search and filter professors by ratings and popularity using Next.js,Pinecone, and OpenAI.",
    image: profscore,
    link: "https://github.com/pc9350/Rate-my-professor",
    deployedLink: "https://profscore-beta.vercel.app/"
  },
  {
    title: "Calmify",
    description: "An AI-powered web app providing personalized emotionalsupport flashcards, utilizing facial emotion detection for real-time mood analysis..",
    image: calmify,
    link: "https://github.com/pc9350/Calmify",
    deployedLink: "https://calmify-ten.vercel.app/"
  },
  {
    title: "Phonicsjoy",
    description: "An interactive web app that generates personalized phonics stories, making learning fun and engaging for children and educators alike.",
    image: phonicsjoy,
    link: "https://github.com/pc9350/phonics-story-generator",
    deployedLink: "https://phonicsjoy.com/"
  },
  {
    title: "IntelliAid",
    description: "A chatbot for TrendyThreads, leveraging AI and AWS Bedrock to provide real-time customer support and enhance user satisfaction.",
    image: intelliAid,
    link: "https://github.com/pc9350/IntelliAid-AI-Customer-Support",
    deployedLink: "http://ec2-3-92-47-86.compute-1.amazonaws.com/"
  },
  {
    title: "PantryPal",
    description: "A pantry management system that offers AI-powered recipe suggestions and image recognition features to simplify kitchen inventory tracking.",
    image: pantry,
    link: "https://github.com/pc9350/Pantry_Management_System",
    deployedLink: "https://pantrypal-eosin.vercel.app/"
  },
  {
    title: "Monster Rewards",
    description: "A gamified iOS banking app that merges finance with fun, boosting engagement and satisfaction.",
    image: CO,
    link: "https://github.com/pc9350/Banking_App",
  },
  {
    title: "ScrollHub",
    description: "A sleek, Material-UI driven web interface for effortless navigation and seamless scrolling.",
    image: img2,
    link: "https://github.com/pc9350/ScrollHub-Platform",

  },
];

export default function Work() {
  return (
    <Container fluid id="work" className="work-container">
      <Row>
        <motion.div 
          className="work-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>My Recent Works</h1>
          <p>Here are some of the projects that I have worked on:</p>
        </motion.div>
        <div className="work-section">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={`work card-${index + 1}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="work-card">
                <div className="img-box">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-banner">
                  <div className="project-info">
                    <span className="project-title">
                      <h3>{project.title}</h3>
                    </span>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <div className="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                      <img src={githubIcon} alt="GitHub" />
                    </a>
                    {project.deployedLink && (
                      <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className="deployed-link">
                        <img src={linkIcon} alt="Deployed Site" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Row>
    </Container>
  );
}