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
import arrow from "../assets/arrow.svg";

// export default function Work() {
//   return (
//     <Container fluid id="work" className="work-container">
//       <Row>
//         <div className="work-header">
//           <h1>My Recent Works</h1>
//           <p>Here are some of the projects that I have worked on:</p>
//         </div>
//         <div className="work-section">
//           <div className="work card-1">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={CO} alt="Project 1" />
//               </div>
//               <a href="https://github.com/pc9350/Banking_App" target="_blank">
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>Monster Rewards</h3>
//                     </span>
//                     <p className="project-description">
//                       A gamified iOS banking app that merges finance with fun,
//                       boosting engagement and satisfaction.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="work card-2">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={img2} alt="Project 2" />
//               </div>
//               <a
//                 href="https://github.com/pc9350/ScrollHub-Platform"
//                 target="_blank"
//               >
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>ScrollHub</h3>
//                     </span>
//                     <p className="project-description">
//                       A sleek, Material-UI driven web interface for effortless
//                       navigation and seamless scrolling.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="work card-3">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={pantry} alt="Project 3" />
//               </div>
//               <a
//                 href="https://github.com/pc9350/Pantry_Management_System"
//                 target="_blank"
//               >
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>PantryPal</h3>
//                     </span>
//                     <p className="project-description">
//                       A pantry management system that offers AI-powered recipe
//                       suggestions and image recognition features to simplify
//                       kitchen inventory tracking.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="work card-4">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={calmify} alt="Project 4" />
//               </div>
//               <a href="https://github.com/pc9350/Calmify" target="_blank">
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>Calmify</h3>
//                     </span>
//                     <p className="project-description">
//                       An AI-powered web app providing personalized emotional
//                       support flashcards, utilizing facial emotion detection for
//                       real-time mood analysis.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="work card-5">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={profscore} alt="Project 5" />
//               </div>
//               <a
//                 href="https://github.com/pc9350/Rate-my-professor"
//                 target="_blank"
//               >
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>Profscore</h3>
//                     </span>
//                     <p className="project-description">
//                       An AI-driven platform that allows students to search and
//                       filter professors by ratings and popularity using Next.js,
//                       Pinecone, and OpenAI.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//           <div className="work card-6">
//             <div className="work-card">
//               <div className="img-box">
//                 <img src={intelliAid} alt="Project 6" />
//               </div>
//               <a
//                 href="https://github.com/pc9350/IntelliAid-AI-Customer-Support"
//                 target="_blank"
//               >
//                 <div className="project-banner">
//                   <div className="project-info">
//                     <span className="project-title">
//                       <h3>IntelliAid</h3>
//                     </span>
//                     <p className="project-description">
//                       A chatbot for TrendyThreads, leveraging AI and AWS Bedrock
//                       to provide real-time customer support and enhance
//                       user satisfaction.
//                     </p>
//                   </div>
//                   <img src={arrow} alt="Arrow" className="project-arrow" />
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </Row>
//     </Container>
//   );
// }


const projects = [
  {
    title: "Profscore",
    description: "An AI-driven platform that allows students to search and filter professors by ratings and popularity using Next.js,Pinecone, and OpenAI.",
    image: profscore,
    link: "https://github.com/pc9350/Rate-my-professor"
  },
  {
    title: "Calmify",
    description: "An AI-powered web app providing personalized emotionalsupport flashcards, utilizing facial emotion detection for real-time mood analysis..",
    image: calmify,
    link: "https://github.com/pc9350/Calmify"
  },
  {
    title: "IntelliAid",
    description: "A chatbot for TrendyThreads, leveraging AI and AWS Bedrock to provide real-time customer support and enhance user satisfaction.",
    image: intelliAid,
    link: "https://github.com/pc9350/IntelliAid-AI-Customer-Support"
  },
  {
    title: "PantryPal",
    description: "A pantry management system that offers AI-powered recipe suggestions and image recognition features to simplify kitchen inventory tracking.",
    image: pantry,
    link: "https://github.com/pc9350/Pantry_Management_System"
  },
  {
    title: "Monster Rewards",
    description: "A gamified iOS banking app that merges finance with fun, boosting engagement and satisfaction.",
    image: CO,
    link: "https://github.com/pc9350/Banking_App"
  },
  {
    title: "ScrollHub",
    description: "A sleek, Material-UI driven web interface for effortless navigation and seamless scrolling.",
    image: img2,
    link: "https://github.com/pc9350/ScrollHub-Platform"
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
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="project-banner">
                    <div className="project-info">
                      <span className="project-title">
                        <h3>{project.title}</h3>
                      </span>
                      <p className="project-description">{project.description}</p>
                    </div>
                    <img src={arrow} alt="Arrow" className="project-arrow" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Row>
    </Container>
  );
}