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
import Churncrunch from "../assets/Customer_Churn_Prediction.png"
import neuroLens from "../assets/NeuroLens.png"
import chatterbox from "../assets/chatterbox.png"
import githubIcon from "../assets/github.svg";
import linkIcon from "../assets/link.svg";
import marketanomaly from "../assets/market-anomoly-detection.jpg"
import llmeval from "../assets/llm-evaluation-project.jpg"
import pullrequestbuddy from "../assets/pullrequestbuddy.jpg"
import chromeextension from "../assets/chrome_extension.jpg"
import captionator from "../assets/captionator_demo_img_1.png"

const projects = [
  {
    title: "Captionator",
    description: "AI-powered caption generation app available on iOS App Store and Google Play Store. Analyzes images and videos to generate creative, engaging social media captions with customizable tones and viral potential scoring.",
    image: captionator,
    deployedLink: "https://captionator-caption-generator.vercel.app/",
    appStoreLink: "https://apps.apple.com/us/app/captionator-caption-generator/id6743040694",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.captionator.app&hl=en_US",
    featured: true
  },
  {
    title: "NeuroLens",
    description: "An AI-powered tool for brain tumor classification using Xception and custom CNN models, with explainable predictions for enhanced medical insights.",
    image: neuroLens,
    link: "https://github.com/pc9350/neurolens_brain_tumor_classification",
    deployedLink: "https://pranavch-neurolens-brain-tumor.hf.space/"
  },
  {
    title: "Calmify",
    description: "An AI-powered web app providing personalized emotional support flashcards, utilizing facial emotion detection for real-time mood analysis..",
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
    title: "ChatterBox",
    description: "A real-time messaging platform inspired by Discord, built with TypeScript, Next.js, and Convex for seamless connections and interaction.",
    image: chatterbox,
    link: "https://github.com/pc9350/ChatterBox-Discord_Clone",
    deployedLink: "https://chatterbox-silk.vercel.app/"
  },
  {
    title: "Pull Request Buddy",
    description: "An AI-powered automated pull request review assistant that enhances code quality with multi-language support and GitHub integration.",
    image: pullrequestbuddy,
    link: "https://github.com/pc9350/PullRequestBuddy-AI-Review-Bot",
  },
  {
    title: "AI Chrome Extension",
    description: "A Chrome extension that provides AI-powered text suggestions using Cerebras' Llama 3.1-8B model and Google's Gemini Nano, built during the Headstarter Fellowship to deliver smart, context-aware completions in browser text inputs.",
    image: chromeextension,
    link: "https://github.com/pc9350/AI-autocomplete-extension",
  },
  {
    title: "Churn Crunch",
    description: "Built a customer churn prediction app using machine learning and Groq API, offering personalized retention strategies.",
    image: Churncrunch,
    link: "https://github.com/pc9350/Customer-Churn-Prediction",
    deployedLink: "https://churncrunch.streamlit.app/"
  },
  {
    title: "Market Anomoly Detection",
    description: "Early warning system for detecting potential market crashes using machine learning and LLM-powered strategy generation. Implements multiple ML models for anomaly detection and automatically generates investment strategies using Groq API, complete with risk management and performance analytics.",
    image: marketanomaly,
    link: "https://github.com/pc9350/Market-Anomaly-Detection",

  },
  {
    title: "LLM Evaluation platform",
    description: "A full-stack web application for comparing and analyzing different Large Language Models (LLMs) in real-time. Built with Next.js, TypeScript, and Shadcn/UI, it features interactive dashboards powered by Recharts for visualizing model performance metrics including response time, token usage, and cost analysis.",
    image: llmeval,
    link: "https://github.com/pc9350/LLM-Evaluation-platform",
    deployedLink: "https://llm-evaluation-platform-xi.vercel.app/"

  },
  {
    title: "Profscore",
    description: "An AI-driven platform that allows students to search and filter professors by ratings and popularity using Next.js,Pinecone, and OpenAI.",
    image: profscore,
    link: "https://github.com/pc9350/Rate-my-professor",
    deployedLink: "https://profscore-beta.vercel.app/"
  },
  {
    title: "IntelliAid",
    description: "A chatbot for TrendyThreads, leveraging AI and AWS Bedrock to provide real-time customer support and enhance user satisfaction.",
    image: intelliAid,
    link: "https://github.com/pc9350/IntelliAid-AI-Customer-Support",
    deployedLink: "https://intelli-aid-ai-customer-support-2w8i.vercel.app/"
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
                {project.featured && <div className="featured-badge">Featured</div>}
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
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                        <img src={githubIcon} alt="GitHub" />
                      </a>
                    )}
                    {project.deployedLink && (
                      <a href={project.deployedLink} target="_blank" rel="noopener noreferrer" className="deployed-link">
                        <img src={linkIcon} alt="Deployed Site" />
                      </a>
                    )}
                    {project.appStoreLink && (
                      <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer" className="app-store-link">
                        <i className="fab fa-app-store-ios"></i>
                      </a>
                    )}
                    {project.playStoreLink && project.playStoreLink !== "#" && (
                      <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer" className="play-store-link">
                        <i className="fab fa-google-play"></i>
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