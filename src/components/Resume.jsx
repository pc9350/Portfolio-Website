import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Resume.css";

const educationData = [
  {
    date: "January 2022 - May 2024",
    degree: "Bachelor of Science in Computer Science (Distinction)",
    institution: "University of Wisconsin, Madison",
    coursework: "Data Structures (CS 300, 400), Algorithms (CS 577), Intro to Operating Systems (CS 537), Building User Interfaces(CS 571)"
  },
  {
    date: "September 2019 - December 2021",
    degree: "Bachelor of Technology in CCE",
    institution: "Manipal University, Jaipur (transferred to UW)",
    coursework: "Object-Oriented Programming, Database Management Systems"
  }
];

const journeyData = [
  {
    date: "July 2024 - Present",
    role: "Software Engineer Resident",
    company: "Headstarter AI",
    techStack: "Next.js, React, TypeScript, Tailwind CSS, Node.js, Express.js, Firebase, AWS, GCP, MongoDB, PostgreSQL, Pinecone, Supabase, Puppeteer, Cheerio, Stripe",
    description: [
      "Developed AI-powered applications, integrating LLMs, RAG, NLP, and real-time analytics into scalable systems.",
      "Built AI-driven platforms, including: Profscore – A professor rating platform leveraging vector search & RAG-based recommendations.",
      "PantryPal – An AI-powered recipe planner automating meal suggestions & reducing manual effort by 95%.",
      "LLM Evaluation Platform – A full-stack tool to benchmark GPT-4, Llama-70B, and Mixtral, optimizing cost & response time.",
      "Led AI fintech research, creating a Market Anomaly Detection system to identify financial insights.",
      "Developing an AI Chrome Extension to enhance productivity through context-aware automation.",
      "Collaborated with industry experts from Google, Y Combinator, Stanford, and Amazon, gaining insights into AI & scalable system design."
    ]
  },
  {
    date: "July 2024 - December 2024",
    role: "Software Engineering Intern",
    company: "TeammateME",
    techStack: "React.js, Next.js, Node.js, SCSS, Expo, React-Native, SEO, Agile Methodologies, Git",
    description: [
      "Developed and maintained the Next.js web platform and React Native (Expo) mobile app, shipping new features and UI/UX improvements.",
      "Optimized site performance by minifying CSS and JS, improving load times and SEO despite working with a large, complex codebase.",
      "Enhanced search visibility by refining metadata, improving content structure, and implementing best SEO practices.",
      "Collaborated with a small, fast-moving team, contributing to design improvements, debugging critical issues, and ensuring smooth frontend-backend integration."
    ]
  },
  {
    date: "September 2023 - December 2023",
    role: "App Developer lead & Scrum Master",
    company: "Capital One",
    techStack: "Swift, FIgma, MongoDB, Node.js, Agile Methodologies, JIRA",
    description: [
      "Led front-end development and served as Scrum Master for a 6-member Agile team, developing an innovative iOS banking app with gamification elements using Swift and SwiftUI.",
      "Implemented Agile methodologies and managed sprints using JIRA, reducing project timeline by 15% and increasing team productivity by 10%.",
      "Designed and executed an innovative UI/UX using Figma, increasing user engagement by 20% and customer satisfaction by 10%.",
      "Integrated AWS services and optimized MongoDB queries for scalable backend solutions, demonstrating full-stack capabilities.",
      "Orchestrated daily stand-ups, sprint planning, and retrospectives, optimizing team workflows and fostering innovation.",
      "Successfully delivered the project 15% ahead of schedule while maintaining high code quality and team cohesion."
    ]
  },
  {
    date: "June 2022 - August 2022",
    role: "RPA Intern",
    company: "AiRo Digital Labs",
    techStack: "UiPath, VB.net, RE Framework",
    description: [
      "Engineered automation programs using UiPath software, VB.NET, and RE Framework to reduce human interaction, save time, and decrease stress associated with tedious administrative and accounting tasks.",
      "Developed and implemented RPA solutions, streamlining business processes and reducing manual task execution by 30%, saving 20 hours per week for the operations team.",
      "Created an automated Invoice Processing System that matches incoming invoice orders against pending purchase orders, significantly enhancing operational efficiency and reducing errors before final Accounts Department processing.",
      "Cultivated an in-depth understanding of UiPath software and Robotic Process Automation through a month of intensive training, applying this knowledge to assigned tasks and projects."
    ]
  },
  // Add more journey entries here
];

const AnimatedItem = ({ children, className }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate' : 'hidden'}`}>
      {children}
    </div>
  );
};

const EducationItem = ({ data }) => (
  <AnimatedItem className="education-item">
    <div className="education-content">
      <h3>{data.degree}</h3>
      <h4>{data.institution}</h4>
      <span className="date">{data.date}</span>
      <p className="coursework">Relevant Coursework: {data.coursework}</p>
    </div>
  </AnimatedItem>
);

export const JourneyItem = ({ data, index }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimatedItem className={`journey-item ${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="journey-content">
        <span className="date">{data.date}</span>
        <h3 className="role">{data.role}</h3>
        <h4 className="company">{data.company}</h4>
        <ul className="description-list">
          {data.description.slice(0, 2).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {data.description.length > 2 && (
          <>
            <ul className={`description-list ${expanded ? 'expanded' : 'hidden'}`}>
              {data.description.slice(2).map((item, index) => (
                <li key={index + 2}>{item}</li>
              ))}
            </ul>
            <button className="read-more-btn" onClick={toggleExpand}>
              {expanded ? 'Read Less' : 'Read More'}
            </button>
          </>
        )}
        <p className="tech-stack">Tech Stack: {data.techStack}</p>
      </div>
    </AnimatedItem>
  );
};

export default function Resume() {
  return (
    <Container fluid id="resume" className="resume-container">
      <h2 className="section-title">Education & Journey</h2>
      <Row className="education-row">
        <Col md={12}>
          <h3 className="subsection-title">Education</h3>
          <div className="education-section">
            {educationData.map((item, index) => (
              <EducationItem key={index} data={item} />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="journey-row">
        <Col md={12}>
          <h3 className="subsection-title">My Professional Journey</h3>
          <div className="journey-timeline">
            {journeyData.map((item, index) => (
              <JourneyItem key={index} data={item} index={index} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
