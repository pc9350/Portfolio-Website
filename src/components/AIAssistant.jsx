import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './AIAssistant.css';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProjectGenerator, setShowProjectGenerator] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [projectComplexity, setProjectComplexity] = useState('medium');
  const messagesEndRef = useRef(null);

  // API configuration
  const API_CONFIG = {
    // Primary API (OpenAI)
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-3.5-turbo', // More affordable than GPT-4
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`
      }
    },
    // Fallback API (HuggingFace Inference API - more affordable)
    huggingface: {
      url: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY || ''}`
      }
    }
  };

  // List of technologies for project ideas
  const technologies = [
    { name: 'React', category: 'frontend' },
    { name: 'Angular', category: 'frontend' },
    { name: 'Vue', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'Django', category: 'backend' },
    { name: 'Flask', category: 'backend' },
    { name: 'MongoDB', category: 'database' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'MySQL', category: 'database' },
    { name: 'Firebase', category: 'database' },
    { name: 'GraphQL', category: 'api' },
    { name: 'REST API', category: 'api' },
    { name: 'TensorFlow', category: 'ml' },
    { name: 'PyTorch', category: 'ml' },
    { name: 'OpenAI API', category: 'ai' },
  ];

  // Function to handle API calls with fallback
  const callAI = async (prompt, systemPrompt = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try OpenAI first through our Lambda proxy
      try {
        const response = await fetch('https://8ktk91infd.execute-api.us-east-1.amazonaws.com/prod/ai-proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service: 'openai',
            prompt: prompt,
            systemPrompt: systemPrompt
          })
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract the content based on the response structure from your Lambda
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        }
        
        // Fall through to HuggingFace if OpenAI didn't return expected format
      } catch (error) {
        console.warn('OpenAI API failed, falling back to HuggingFace:', error);
        // Fall through to HuggingFace
      }
      
      // Fallback to HuggingFace through our Lambda proxy
      const response = await fetch('https://8ktk91infd.execute-api.us-east-1.amazonaws.com/prod/ai-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: 'huggingface',
          prompt: prompt,
          systemPrompt: systemPrompt
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the content based on the response structure from your Lambda
      if (data[0] && data[0].generated_text) {
        return data[0].generated_text;
      }
      
      // If no API responses worked, use fallback
      return generateFallbackResponse(prompt);
      
    } catch (error) {
      console.error('AI API Error:', error);
      setError('Failed to get a response. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback responses when API is not available
  const generateFallbackResponse = (prompt) => {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('hello') || promptLower.includes('hi')) {
      return "Hello! I'm an AI assistant that can help you learn about Pranav's skills and projects. What would you like to know?";
    } else if (promptLower.includes('skill') || promptLower.includes('experience') || promptLower.includes('work')) {
      return "Pranav is currently a Software Engineering Resident at Headstarter AI (July 2024 - Present) where he develops AI-driven applications integrating LLMs, RAG, and NLP. He previously worked as a Software Engineering Intern at TeammateME (July-Dec 2024), a Software Engineering Extern at Capital One (Sep-Dec 2023), and a Software Engineering Intern at AiRo Digital Labs (Jun-Aug 2022). His skills include JavaScript, Java, Python, Swift, React, Next.js, Node.js, MongoDB, AWS, and various AI technologies.";
    } else if (promptLower.includes('education') || promptLower.includes('degree') || promptLower.includes('university')) {
      return "Pranav has a Bachelor of Science in Computer Science with Distinction from the University of Wisconsin – Madison (Graduated: May 2024) with a 3.9 GPA.";
    } else if (promptLower.includes('project') || promptLower.includes('portfolio')) {
      return "Pranav's projects include an LLM Evaluation Platform (Next.js, TypeScript), NeuroLens for brain tumor classification (AI, CNN), a Customer Churn Prediction App (Streamlit, ML models, Groq API), and Phonicsjoy, a phonics teaching website (React, Supabase). For more projects, check out the projects section on this website.";
    } else if (promptLower.includes('contact')) {
      return "You can contact Pranav through the Contact form in this portfolio or via email at chhabrapranav2001@gmail.com.";
    } else if (promptLower.includes('code') || promptLower.includes('example')) {
      return "I can provide code examples in JavaScript, TypeScript, Python, React, and more. Try asking for a specific example like 'Show me a React component for a counter' or 'Give me a Python function for data processing'.";
    } else if (promptLower.includes('certification') || promptLower.includes('aws')) {
      return "Pranav is an AWS Certified Cloud Practitioner, demonstrating his knowledge of AWS cloud services and architecture.";
    } else if (promptLower.includes('ai') || promptLower.includes('machine learning')) {
      return "Pranav has experience with various AI and ML technologies including OpenAI, GPT Vision, AWS Rekognition, Hugging Face, RAG (Retrieval Augmented Generation), and has built projects like NeuroLens for brain tumor classification and an LLM Evaluation Platform.";
    } else {
      return "Try asking about Pranav's skills, work experience, education, projects, or request code examples!";
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
      const systemPrompt = `You are an AI assistant embedded in Pranav Chhabra's portfolio website. Provide helpful, concise responses about Pranav's skills, projects, and coding knowledge. When providing code examples, always wrap them in triple backticks with the language specified (e.g. \`\`\`javascript). Keep responses under 150 words.

Here is Pranav's resume information:

EDUCATION:
- Bachelor of Science in Computer Science with Distinction, University of Wisconsin – Madison (Graduated: May 2024)
- GPA: 3.9

PROFESSIONAL EXPERIENCE:
- Software Engineering Resident at Headstarter AI (July 2024 - Present)
  * Developed & deployed AI-driven applications, integrating LLMs, RAG, NLP, and real-time analytics
  * Built AI-powered platforms including Profscore (professor rating with vector search) and PantryPal (AI-driven recipe planner)
  * Created fintech solutions including Market Anomaly Detection system and AI-driven Virtual Assistants
  * Built an AI-powered Chrome Extension for productivity automation
  * Mentored by professionals from Google and Netflix

- Software Engineering Intern at TeammateME (July 2024 - December 2024)
  * Developed and optimized Next.js web platform and React Native (Expo) mobile app
  * Enhanced website SEO and reduced page load times by minifying CSS/JS
  * Designed & launched new features, refining UI/UX across web and mobile

- Software Engineering Extern at Capital One (September 2023 - December 2023)
  * Developed "MonsterRewards" iOS app using Swift and SwiftUI, increasing user engagement by 20%
  * Optimized MongoDB queries and integrated AWS services to enhance backend scalability
  * Designed and optimized REST APIs to streamline data access and improve efficiency

- Software Engineering Intern at AiRo Digital Labs (June 2022 - August 2022)
  * Built automation scripts using UiPath and VB.NET, reducing manual task execution by 30%
  * Integrated automation tools with cloud services, saving 20 hours per week for operations

SKILLS:
- Languages & Frameworks: JavaScript, Java, Python, Swift, SwiftUI, React, React-Native, Next.js, Node.js, Express.js, TypeScript
- Backend & Cloud: MongoDB, MySQL, AWS, GCP, Firebase, Docker, Pinecone
- AI & Automation: OpenAI, GPT Vision, AWS Rekognition, UiPath, Hugging Face, Puppeteer, Cheerio, RAG
- APIs & Tools: REST APIs, Stripe, Groq API, TDD, Agile
- Certification: AWS Certified Cloud Practitioner

PROJECTS:
- LLM Evaluation Platform (January 2025)
  * Next.js + TypeScript platform for parallel LLM evaluation (GPT-4, Llama-70B, Mixtral)
  * Recharts analytics dashboard for real-time cost, token usage, and response time visualization

- NeuroLens: Brain Tumor Classification (November 2024)
  * AI model for classifying brain tumors in MRI scans with ~94% accuracy (custom CNN) and ~99.5% accuracy (Xception model)
  * Enhanced model interpretability with Gemini 1.5 Flash for saliency maps

- Customer Churn Prediction App (October 2024)
  * Full-stack churn prediction platform using Streamlit, Replit, and machine learning models
  * Enhanced model accuracy from 75% to 85% through feature engineering and SMOTE
  * Embedded Groq API for automated personalized email generation

- Phonicsjoy: Phonics Teaching Website (September 2024)
  * Phonics teaching website using React and Supabase with AI-generated phonics stories
  * Improved user interaction by 20% through customized phonics learning journeys

When asked about Pranav's experience, skills, or background, use this information to provide accurate responses and make sure to get his name right every time. For more projects, direct users to the projects section on the website.`;
      
      const aiResponse = await callAI(input, systemPrompt);
      
      if (aiResponse) {
        setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle tech selection
  const toggleTech = (tech) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  // Function to generate project idea based on selected technologies
  const generateProjectIdea = async () => {
    if (selectedTechs.length === 0) {
      setError('Please select at least one technology');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const systemPrompt = `You are a helpful AI assistant specializing in software development project ideas for Pranav Chhabra. Provide structured project ideas with a title, description, key features (4-5 bullet points), and learning outcomes (3-4 bullet points).

Here is Pranav's background and skills information:

EDUCATION:
- Bachelor of Science in Computer Science with Distinction, University of Wisconsin – Madison (Graduated: May 2024)
- GPA: 3.9

SKILLS:
- Languages & Frameworks: JavaScript, Java, Python, Swift, SwiftUI, React, React-Native, Next.js, Node.js, Express.js, TypeScript
- Backend & Cloud: MongoDB, MySQL, AWS, GCP, Firebase, Docker, Pinecone
- AI & Automation: OpenAI, GPT Vision, AWS Rekognition, UiPath, Hugging Face, Puppeteer, Cheerio, RAG
- APIs & Tools: REST APIs, Stripe, Groq API, TDD, Agile
- Certification: AWS Certified Cloud Practitioner

Suggest project ideas that would showcase Pranav's skills and help him grow as a developer. The projects should be realistic, practical, and aligned with current industry trends.`;
      
      const prompt = `Generate a ${projectComplexity} complexity project idea using these technologies: ${selectedTechs.join(', ')}. Include title, description, key features, and learning outcomes. Format your response with clear sections.`;
      
      const aiResponse = await callAI(prompt, systemPrompt);
      
      if (aiResponse) {
        setMessages([
          ...messages,
          { text: `Generate a ${projectComplexity} complexity project idea using: ${selectedTechs.join(', ')}`, sender: 'user' },
          { text: aiResponse, sender: 'ai' }
        ]);
        setShowProjectGenerator(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate a project idea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section id="ai-assistant" className="ai-assistant">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="ai-assistant-title">AI Assistant</h2>
              <p className="ai-assistant-subtitle">
                Chat with my AI assistant to learn more about my skills, get project ideas, or see code examples.
              </p>
            </motion.div>
            
            <motion.div 
              className="chat-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="messages-container">
                {messages.length === 0 ? (
                  <div className="welcome-message">
                    <p>👋 Hi there! I'm an AI assistant that can tell you about Pranav's professional experience, skills, education, and projects. You can also ask me for project ideas or code examples. What would you like to know?</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      <div className="message-content">
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="message ai loading">
                    <div className="message-content">
                      <Spinner animation="border" size="sm" /> Thinking...
                    </div>
                  </div>
                )}
                {error && (
                  <div className="message error">
                    <div className="message-content">
                      <p>{error}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {!showProjectGenerator ? (
                <Form onSubmit={handleSubmit} className="chat-form">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setShowProjectGenerator(true)}
                      disabled={isLoading}
                    >
                      Project Idea Generator
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={isLoading || !input.trim()}
                    >
                      {isLoading ? <Spinner animation="border" size="sm" /> : 'Send'}
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="project-generator">
                  <h4>Project Idea Generator</h4>
                  <p>Select technologies and complexity to generate a project idea</p>
                  
                  <div className="tech-selector">
                    <div className="tech-categories">
                      {['frontend', 'backend', 'database', 'api', 'ml', 'ai'].map(category => (
                        <div key={category} className="tech-category">
                          <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                          <div className="tech-options">
                            {technologies
                              .filter(tech => tech.category === category)
                              .map(tech => (
                                <Button
                                  key={tech.name}
                                  variant={selectedTechs.includes(tech.name) ? 'primary' : 'outline-secondary'}
                                  size="sm"
                                  onClick={() => toggleTech(tech.name)}
                                  className={selectedTechs.includes(tech.name) ? 'selected' : ''}
                                >
                                  {tech.name}
                                </Button>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Project Complexity</Form.Label>
                    <Form.Select 
                      value={projectComplexity}
                      onChange={(e) => setProjectComplexity(e.target.value)}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </Form.Select>
                  </Form.Group>
                  
                  {error && (
                    <div className="error-message mb-3">
                      {error}
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowProjectGenerator(false)}
                      disabled={isLoading}
                    >
                      Back to Chat
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={generateProjectIdea}
                      disabled={isLoading || selectedTechs.length === 0}
                    >
                      {isLoading ? <><Spinner animation="border" size="sm" /> Generating...</> : 'Generate Idea'}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AIAssistant; 