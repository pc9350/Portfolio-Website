import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProjectGenerator, setShowProjectGenerator] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [projectComplexity, setProjectComplexity] = useState('medium');
  const [generatedProject, setGeneratedProject] = useState(null);
  const messagesEndRef = useRef(null);
  const { theme } = useContext(ThemeContext);

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
    { name: 'AWS', category: 'cloud' },
    { name: 'Azure', category: 'cloud' },
    { name: 'Google Cloud', category: 'cloud' },
    { name: 'Docker', category: 'devops' },
    { name: 'Kubernetes', category: 'devops' },
    { name: 'Tailwind CSS', category: 'css' },
    { name: 'Bootstrap', category: 'css' },
    { name: 'Material UI', category: 'css' },
  ];

  // Sample responses for demonstration (will be replaced with actual API calls)
  const sampleResponses = {
    skills: "I specialize in React, Node.js, and modern JavaScript. I also have experience with Python, data visualization, and responsive web design.",
    projects: "Based on your interests, you might consider building a real-time chat application with WebSockets, a machine learning model for image recognition, or a blockchain-based voting system.",
    contact: "You can reach me through the contact form in the Contact section or via email at your.email@example.com.",
    default: "I'm an AI assistant designed to showcase my creator's skills. Ask me about their skills, project ideas, or request code snippets!"
  };

  // Function to generate code snippets based on user request
  const generateCodeSnippet = (language) => {
    const snippets = {
      react: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;`,
      javascript: `// Fetch data from an API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}`,
      python: `# A simple machine learning model using scikit-learn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd

# Load data
data = pd.read_csv('data.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy:.2f}")`,
      default: `console.log("Hello, World!");`
    };
    
    return snippets[language] || snippets.default;
  };

  // Function to handle AI response generation
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('skill') || input.includes('experience') || input.includes('know')) {
      return sampleResponses.skills;
    } else if (input.includes('project') || input.includes('idea') || input.includes('build')) {
      return "I can help you generate project ideas! Click the 'Project Idea Generator' button below to get started, or ask me something else.";
    } else if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return sampleResponses.contact;
    } else if (input.includes('code') || input.includes('snippet') || input.includes('example')) {
      if (input.includes('react')) {
        return `Here's a React component example:\n\n\`\`\`jsx\n${generateCodeSnippet('react')}\n\`\`\``;
      } else if (input.includes('javascript') || input.includes('js')) {
        return `Here's a JavaScript example:\n\n\`\`\`javascript\n${generateCodeSnippet('javascript')}\n\`\`\``;
      } else if (input.includes('python')) {
        return `Here's a Python example:\n\n\`\`\`python\n${generateCodeSnippet('python')}\n\`\`\``;
      } else {
        return `What language would you like a code snippet for? I can provide examples in React, JavaScript, or Python.`;
      }
    } else {
      return sampleResponses.default;
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be an API call to OpenAI or another AI service
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-3.5-turbo',
      //     messages: [{ role: 'user', content: input }],
      //     max_tokens: 150
      //   })
      // });
      // const data = await response.json();
      // const aiResponse = data.choices[0].message.content;
      
      // For now, we'll use our simple response generator
      const aiResponse = generateResponse(input);
      
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would be an API call to OpenAI or another AI service
      // const response = await fetch('https://api.openai.com/v1/chat/completions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-3.5-turbo',
      //     messages: [{ 
      //       role: 'user', 
      //       content: `Generate a ${projectComplexity} complexity project idea using these technologies: ${selectedTechs.join(', ')}. Include title, description, key features, and learning outcomes.` 
      //     }],
      //     max_tokens: 500
      //   })
      // });
      // const data = await response.json();
      // const projectIdea = data.choices[0].message.content;
      
      // For now, we'll use a predefined project idea based on selected technologies
      const projectIdea = generateProjectIdeaBasedOnTech(selectedTechs, projectComplexity);
      
      setGeneratedProject(projectIdea);
      
      // Add the project idea to the chat
      const userMessage = { 
        text: `Generate a ${projectComplexity} complexity project idea using: ${selectedTechs.join(', ')}`, 
        sender: 'user' 
      };
      const aiResponse = { 
        text: `Here's a project idea based on your selected technologies:\n\n${projectIdea.title}\n\n${projectIdea.description}\n\n**Key Features:**\n${projectIdea.features.map(f => `- ${f}`).join('\n')}\n\n**Learning Outcomes:**\n${projectIdea.learningOutcomes.map(o => `- ${o}`).join('\n')}`, 
        sender: 'ai' 
      };
      
      setMessages([...messages, userMessage, aiResponse]);
      setShowProjectGenerator(false);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate a project idea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate project ideas based on selected technologies
  const generateProjectIdeaBasedOnTech = (techs, complexity) => {
    // Sample project ideas based on common technology combinations
    const projectIdeas = [
      {
        techs: ['React', 'Node.js', 'MongoDB'],
        title: 'Personal Task Management System',
        description: 'A full-stack application that allows users to create, organize, and track their tasks with customizable categories, priorities, and deadlines.',
        features: [
          'User authentication and authorization',
          'Task creation with rich text editor',
          'Drag-and-drop task organization',
          'Filter and search functionality',
          'Data visualization of task completion metrics'
        ],
        learningOutcomes: [
          'Building a full-stack JavaScript application',
          'Implementing CRUD operations with MongoDB',
          'Creating responsive UI components with React',
          'Managing state in a complex application',
          'Implementing real-time updates with WebSockets'
        ],
        complexity: 'medium'
      },
      {
        techs: ['React', 'Firebase'],
        title: 'Real-time Collaborative Whiteboard',
        description: 'A digital whiteboard application that allows multiple users to draw, add notes, and collaborate in real-time.',
        features: [
          'Real-time collaboration with multiple cursors',
          'Drawing tools with different colors and brush sizes',
          'Text and sticky note creation',
          'Image upload and manipulation',
          'Session recording and playback'
        ],
        learningOutcomes: [
          'Implementing real-time data synchronization with Firebase',
          'Managing complex state in a collaborative environment',
          'Working with HTML5 Canvas API',
          'Handling concurrent user interactions',
          'Optimizing performance for real-time applications'
        ],
        complexity: 'hard'
      },
      {
        techs: ['Next.js', 'Tailwind CSS'],
        title: 'Personal Portfolio Website with Blog',
        description: 'A modern, responsive portfolio website with an integrated blog system to showcase your projects and share your knowledge.',
        features: [
          'Responsive design with dark/light mode',
          'Project showcase with filtering options',
          'Markdown-based blog with code syntax highlighting',
          'Contact form with email integration',
          'SEO optimization'
        ],
        learningOutcomes: [
          'Building static and server-rendered pages with Next.js',
          'Implementing responsive designs with Tailwind CSS',
          'Creating a content management system for blog posts',
          'Optimizing website performance and SEO',
          'Deploying and managing a production website'
        ],
        complexity: 'easy'
      },
      {
        techs: ['React', 'TensorFlow', 'Node.js'],
        title: 'AI-Powered Image Recognition App',
        description: 'An application that uses machine learning to identify objects, scenes, or faces in images uploaded by users.',
        features: [
          'Image upload and processing',
          'Real-time object detection and classification',
          'User history of analyzed images',
          'Customizable detection parameters',
          'Export and sharing of results'
        ],
        learningOutcomes: [
          'Integrating TensorFlow.js models in a web application',
          'Processing and manipulating images in the browser',
          'Building a responsive UI for ML applications',
          'Optimizing performance for compute-intensive tasks',
          'Implementing proper error handling for ML operations'
        ],
        complexity: 'hard'
      },
      {
        techs: ['Vue', 'Express', 'PostgreSQL'],
        title: 'Recipe Management and Meal Planning System',
        description: 'A comprehensive application for storing recipes, planning meals, and generating shopping lists based on selected meals.',
        features: [
          'Recipe creation and management with categories and tags',
          'Drag-and-drop meal planning calendar',
          'Automatic shopping list generation',
          'Nutritional information calculation',
          'Recipe scaling and conversion'
        ],
        learningOutcomes: [
          'Building a Vue.js frontend with component reusability',
          'Designing a relational database schema',
          'Implementing complex queries with PostgreSQL',
          'Creating a RESTful API with Express',
          'Managing state across multiple related features'
        ],
        complexity: 'medium'
      }
    ];
    
    // Find projects that match at least one of the selected technologies
    const matchingProjects = projectIdeas.filter(project => 
      project.techs.some(tech => techs.includes(tech)) && 
      (complexity === 'any' || project.complexity === complexity)
    );
    
    if (matchingProjects.length > 0) {
      // Return a random matching project
      return matchingProjects[Math.floor(Math.random() * matchingProjects.length)];
    } else {
      // If no exact match, create a generic project idea
      return {
        title: `${techs[0]} ${techs.length > 1 ? `+ ${techs.length - 1} more` : ''} ${complexity.charAt(0).toUpperCase() + complexity.slice(1)} Project`,
        description: `A ${complexity} complexity project that combines ${techs.join(', ')} to create a modern web application that solves a real-world problem.`,
        features: [
          'User authentication and profile management',
          'Interactive dashboard with data visualization',
          'CRUD operations for main resources',
          'Responsive design for all device sizes',
          'API integration with third-party services'
        ],
        learningOutcomes: [
          `Mastering ${techs.join(' and ')} integration`,
          'Building scalable and maintainable code',
          'Implementing best practices for performance optimization',
          'Creating intuitive user interfaces',
          'Handling complex state management across the application'
        ]
      };
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
                    <p>👋 Hi there! I'm an AI assistant that can tell you about my creator's skills, suggest project ideas, or provide code snippets. What would you like to know?</p>
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
                <Form onSubmit={handleSubmit} className="input-form">
                  <Form.Group className="input-group">
                    <Form.Control
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      className="send-button"
                      disabled={isLoading || !input.trim()}
                    >
                      {isLoading ? <Spinner animation="border" size="sm" /> : 'Send'}
                    </Button>
                  </Form.Group>
                  <div className="mt-2 text-center">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => setShowProjectGenerator(true)}
                      className="project-generator-button"
                    >
                      Project Idea Generator
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="project-generator">
                  <h4>Project Idea Generator</h4>
                  <p>Select technologies and complexity to generate a project idea:</p>
                  
                  <div className="tech-selector">
                    <h5>Technologies:</h5>
                    <div className="tech-badges">
                      {technologies.map((tech) => (
                        <Badge 
                          key={tech.name}
                          bg={selectedTechs.includes(tech.name) ? 'primary' : 'secondary'}
                          className={`tech-badge ${selectedTechs.includes(tech.name) ? 'selected' : ''}`}
                          onClick={() => toggleTech(tech.name)}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="complexity-selector mt-3">
                    <h5>Project Complexity:</h5>
                    <Form.Select 
                      value={projectComplexity}
                      onChange={(e) => setProjectComplexity(e.target.value)}
                      className="mb-3"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="any">Any Complexity</option>
                    </Form.Select>
                  </div>
                  
                  <div className="d-flex justify-content-between mt-3">
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowProjectGenerator(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={generateProjectIdea}
                      disabled={isLoading || selectedTechs.length === 0}
                    >
                      {isLoading ? <><Spinner animation="border" size="sm" /> Generating...</> : 'Generate Project Idea'}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
            
            <div className="ai-info">
              <p>
                <strong>Note:</strong> This is a demonstration of how AI can be integrated into a portfolio website. 
                In a production environment, this would connect to OpenAI's API or another AI service.
              </p>
              <p>
                Try asking about my skills, project ideas, or request code snippets in React, JavaScript, or Python!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AIAssistant; 