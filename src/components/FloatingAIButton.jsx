import React, { useState, useRef, useEffect, useContext } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import {
  FaRobot,
  FaComment,
  FaLightbulb,
  FaCode,
  FaCopy,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import "./FloatingAIButton.css";

// Helper function to detect and format code blocks
const formatMessageWithCodeBlocks = (text) => {
  if (!text) return [];

  // Split by code block markers (```language and ```)
  const parts = text.split(/(```[a-z]*\n[\s\S]*?\n```)/g);

  return parts.map((part, index) => {
    // Check if this part is a code block
    if (part.startsWith("```") && part.endsWith("```")) {
      // Extract language and code
      const match = part.match(/```([a-z]*)\n([\s\S]*?)\n```/);

      if (match) {
        const [, language, code] = match;
        return {
          type: "code",
          language: language || "plaintext",
          content: code.trim(),
          id: `code-${index}`,
        };
      }
    }

    // Regular text
    return {
      type: "text",
      content: part,
    };
  });
};

const FloatingAIButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [projectComplexity, setProjectComplexity] = useState("medium");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // API configuration
  const API_CONFIG = {
    // Primary API (OpenAI)
    openai: {
      url: "https://api.openai.com/v1/chat/completions",
      model: "gpt-3.5-turbo", // More affordable than GPT-4
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ""}`,
      },
    },
    // Fallback API (HuggingFace Inference API - more affordable)
    huggingface: {
      url: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_HUGGINGFACE_API_KEY || ""
        }`,
      },
    },
  };

  // List of technologies for project ideas
  const technologies = [
    { name: "React", category: "frontend", color: "#61DAFB" },
    { name: "Angular", category: "frontend", color: "#DD0031" },
    { name: "Vue", category: "frontend", color: "#4FC08D" },
    { name: "Next.js", category: "frontend", color: "#000000" },
    { name: "Node.js", category: "backend", color: "#339933" },
    { name: "Express", category: "backend", color: "#000000" },
    { name: "Django", category: "backend", color: "#092E20" },
    { name: "Flask", category: "backend", color: "#000000" },
    { name: "MongoDB", category: "database", color: "#47A248" },
    { name: "PostgreSQL", category: "database", color: "#336791" },
    { name: "MySQL", category: "database", color: "#4479A1" },
    { name: "Firebase", category: "database", color: "#FFCA28" },
    { name: "GraphQL", category: "api", color: "#E10098" },
    { name: "REST API", category: "api", color: "#005571" },
    { name: "TensorFlow", category: "ml", color: "#FF6F00" },
    { name: "PyTorch", category: "ml", color: "#EE4C2C" },
    { name: "OpenAI API", category: "ai", color: "#412991" },
    { name: "Tailwind CSS", category: "css", color: "#38B2AC" },
    { name: "Bootstrap", category: "css", color: "#7952B3" },
    { name: "Material UI", category: "css", color: "#0081CB" },
  ];

  // Programming languages for code examples
  const programmingLanguages = [
    { id: "javascript", name: "JavaScript", color: "#F7DF1E" },
    { id: "typescript", name: "TypeScript", color: "#3178C6" },
    { id: "python", name: "Python", color: "#3776AB" },
    { id: "react", name: "React", color: "#61DAFB" },
  ];

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle API calls with fallback
  const callAI = async (prompt, systemPrompt = "") => {
    setIsLoading(true);
    setError(null);

    console.log("Calling AI with prompt:", prompt);
    console.log("System prompt:", systemPrompt);

    try {
      // Try OpenAI first through our Lambda proxy
      try {
        const response = await fetch(
          "https://ztw97igkwk.execute-api.us-east-1.amazonaws.com/prod/ai-proxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service: "openai",
              prompt: prompt,
              systemPrompt: systemPrompt || "",
            }),
          }
        );

        console.log("OpenAI response status:", response.status);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("OpenAI response data:", data);

        if (data.response) {
          console.log("Successfully received OpenAI response with custom format");
          return data.response;
        }

        // Extract the content based on the response structure from your Lambda
        if (data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content;
          console.log("Successfully received OpenAI response");
          return content;
        }

        // Fall through to HuggingFace if OpenAI didn't return expected format
      } catch (error) {
        console.warn("OpenAI API failed, falling back to HuggingFace:", error);
        // Fall through to HuggingFace
      }

      // Fallback to HuggingFace through our Lambda proxy
      const response = await fetch(
        "https://ztw97igkwk.execute-api.us-east-1.amazonaws.com/prod/ai-proxy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: "huggingface",
            prompt: `${systemPrompt ? systemPrompt + "\n\n" : ""}${prompt}`,
            systemPrompt: systemPrompt || "",
          }),
        }
      );

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
      console.error("AI API Error:", error);
      setError("Failed to get a response. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback responses when API is not available
  const generateFallbackResponse = (prompt) => {
    const promptLower = prompt.toLowerCase();

    if (promptLower.includes("hello") || promptLower.includes("hi")) {
      return "Hello! I'm an AI assistant that can help you learn about Pranav's skills and projects. What would you like to know?";
    } else if (
      promptLower.includes("skill") ||
      promptLower.includes("experience") ||
      promptLower.includes("work")
    ) {
      return "Pranav is currently a Software Engineering Resident at Headstarter AI (July 2024 - Present) where he develops AI-driven applications integrating LLMs, RAG, and NLP. He previously worked as a Software Engineering Intern at TeammateME (July-Dec 2023), a Software Engineering Extern at Capital One (Sep-Dec 2023), and a Software Engineering Intern at AiRo Digital Labs (Jun-Aug 2022). His skills include JavaScript, Java, Python, Swift, React, Next.js, Node.js, MongoDB, AWS, and various AI technologies.";
    } else if (
      promptLower.includes("education") ||
      promptLower.includes("degree") ||
      promptLower.includes("university")
    ) {
      return "Pranav has a Bachelor of Science in Computer Science with Distinction from the University of Wisconsin – Madison (Graduated: May 2024) with a 3.9 GPA.";
    } else if (
      promptLower.includes("project") ||
      promptLower.includes("portfolio")
    ) {
      return "Pranav's projects include an LLM Evaluation Platform (Next.js, TypeScript), NeuroLens for brain tumor classification (AI, CNN), a Customer Churn Prediction App (Streamlit, ML models, Groq API), and Phonicsjoy, a phonics teaching website (React, Supabase). For more projects, check out the projects section on this website.";
    } else if (
      promptLower.includes("contact") ||
      promptLower.includes("email")
    ) {
      return "You can contact Pranav through the Contact form in this portfolio or via email at chhabrapranav2001@gmail.com.";
    } else if (
      promptLower.includes("code") ||
      promptLower.includes("example")
    ) {
      return "I can provide code examples in JavaScript, TypeScript, Python, React, and more. Try asking for a specific example like 'Show me a React component for a counter' or 'Give me a Python function for data processing'.";
    } else {
      return "Try asking about Pranav's skills, work experience, education, projects, or request code examples!";
    }
  };

  // Handle chat form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    const systemPrompt = `You are an AI assistant embedded in Pranav Chhabra's portfolio website. Provide helpful, concise responses about Pranav's skills, projects, and coding knowledge. When providing code examples, always wrap them in triple backticks with the language specified (e.g. \`\`\`javascript). Keep responses under 150 words.

Here is Pranav's resume information:

EDUCATION:
- Bachelor of Science in Computer Science with Distinction, University of Wisconsin – Madison (Graduated: May 2024)
- GPA: 3.9

PROFESSIONAL EXPERIENCE:
- Software Engineering Resident, Headstarter AI (July 2024 - Present)
  * Developing AI-driven applications integrating LLMs, RAG, and NLP
  * Implementing vector databases for efficient information retrieval
  * Collaborating with cross-functional teams on AI product development

- Software Engineering Intern, TeammateME (July 2023 - December 2023)
  * Developed full-stack features for a sports team management platform
  * Implemented responsive UI components with React and Material UI
  * Optimized database queries resulting in 30% faster page loads

- Software Engineering Extern, Capital One (September 2023 - December 2023)
  * Contributed to internal tools development using Java and Spring Boot
  * Participated in Agile development processes and code reviews

- Software Engineering Intern, AiRo Digital Labs (June 2022 - August 2022)
  * Developed automation solutions using UiPath
  * Created dashboards for process monitoring and analytics

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
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
    }
  };

  // Copy code to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    });
  };

  // Generate project idea
  const generateProjectIdea = async () => {
    if (selectedTechs.length === 0) {
      setError("Please select at least one technology");
      return;
    }

    const userMessage = {
      text: `Generate a ${projectComplexity} complexity project idea using: ${selectedTechs.join(
        ", "
      )}`,
      sender: "user",
    };
    setMessages([...messages, userMessage]);

    const systemPrompt =
      "You are a creative project idea generator. Your task is to generate NEW project ideas based on the technologies provided. DO NOT describe or mention Pranav's existing portfolio projects. Instead, create entirely new project concepts that someone could build. Format your response with a title, description, key features (4-5 bullet points), learning outcomes (3-4 bullet points), and implementation steps (3-4 bullet points).";

    const prompt = `Generate a completely new ${projectComplexity} complexity project idea using these technologies: ${selectedTechs.join(
      ", "
    )}. This should be a project that hasn't been built yet - NOT one of Pranav's existing portfolio projects. Include a creative title, detailed description, key features, learning outcomes, and basic implementation steps. Format your response with clear sections.`;

    const aiResponse = await callAI(prompt, systemPrompt);
    console.log("AI Response:", aiResponse)

    if (aiResponse) {
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      setActiveTab("chat");
    }
  };

  // Generate code example
  const generateCodeExample = async () => {
    const language = selectedLanguage;

    const userMessage = {
      text: `Show me a ${language} code example`,
      sender: "user",
    };
    setMessages([...messages, userMessage]);

    const systemPrompt =
      "You are a coding instructor specializing in providing educational code examples. Your task is to create clean, well-commented code examples that follow best practices. DO NOT describe Pranav's portfolio projects or existing code. Instead, create new, reusable code snippets that demonstrate programming concepts. Always wrap code examples in triple backticks with the language specified (e.g. ```javascript).";

    let prompt;
    switch (language) {
      case "javascript":
        prompt =
          "Create a new, practical JavaScript example of a utility function for data fetching with error handling and loading state. This should be a reusable code snippet, not related to any existing portfolio projects. Include detailed comments explaining each part of the code.";
        break;
      case "typescript":
        prompt =
          "Create a new, practical TypeScript example of a generic function for type-safe data fetching with interfaces. This should be a reusable code snippet, not related to any existing portfolio projects. Include detailed comments explaining each part of the code.";
        break;
      case "python":
        prompt =
          "Create a new, practical Python example of a data processing function using pandas and error handling. This should be a reusable code snippet, not related to any existing portfolio projects. Include detailed comments explaining each part of the code.";
        break;
      case "react":
        prompt =
          "Create a new, practical React functional component example with hooks for a reusable form input with validation. This should be a reusable code snippet, not related to any existing portfolio projects. Include detailed comments explaining each part of the code.";
        break;
      default:
        prompt = `Create a new, practical ${language} code example that demonstrates best practices. This should be a reusable code snippet, not related to any existing portfolio projects. Include detailed comments explaining each part of the code.`;
    }

    const aiResponse = await callAI(prompt, systemPrompt);

    if (aiResponse) {
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      setActiveTab("chat");
    }
  };

  // Toggle tech selection
  const toggleTech = (tech) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  // Render chat tab content
  const renderChatTab = () => (
    <div className="chat-tab">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <p>
              👋 Hi there! I'm an AI assistant that can tell you about Pranav's
              skills, suggest project ideas, or provide code snippets. What
              would you like to know?
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">
                {formatMessageWithCodeBlocks(msg.text).map(
                  (part, partIndex) => {
                    if (part.type === "code") {
                      return (
                        <div className="code-block" key={partIndex}>
                          <div className="code-header">
                            <span className="code-language">
                              {part.language}
                            </span>
                            <button
                              className="copy-button"
                              onClick={() =>
                                copyToClipboard(part.content, part.id)
                              }
                              aria-label="Copy code"
                            >
                              {copiedCodeId === part.id ? (
                                "Copied!"
                              ) : (
                                <FaCopy />
                              )}
                            </button>
                          </div>
                          <pre className="code-content">
                            <code>{part.content}</code>
                          </pre>
                        </div>
                      );
                    } else {
                      return part.content
                        .split("\n")
                        .map((line, i) => (
                          <p key={`${partIndex}-${i}`}>{line}</p>
                        ));
                    }
                  }
                )}
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
            aria-label="Send message"
          >
            <FaComment />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );

  // Render projects tab content
  const renderProjectsTab = () => (
    <div className="projects-tab">
      <h4>Project Idea Generator</h4>
      <p>Select technologies and complexity to generate a project idea</p>

      <div className="tech-selector">
        <h5>Technologies:</h5>
        <div className="tech-badges">
          {technologies.map((tech) => (
            <Button
              key={tech.name}
              variant={
                selectedTechs.includes(tech.name)
                  ? "primary"
                  : "outline-secondary"
              }
              className={`tech-badge ${
                selectedTechs.includes(tech.name) ? "selected" : ""
              }`}
              onClick={() => toggleTech(tech.name)}
              style={{
                backgroundColor: selectedTechs.includes(tech.name)
                  ? tech.color
                  : "transparent",
                borderColor: tech.color,
                color: selectedTechs.includes(tech.name)
                  ? "#fff"
                  : theme === "dark"
                  ? "#fff"
                  : "#333",
              }}
            >
              {tech.name}
            </Button>
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

      {error && <div className="error-message mb-3">{error}</div>}

      <div className="d-grid gap-2">
        <Button
          variant="primary"
          className="generate-button"
          onClick={generateProjectIdea}
          disabled={isLoading || selectedTechs.length === 0}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Generating...
            </>
          ) : (
            "Generate Project Idea"
          )}
        </Button>
      </div>
    </div>
  );

  // Render code tab content
  const renderCodeTab = () => (
    <div className="code-tab">
      <h4>Code Examples</h4>
      <p>Select a language to get a code snippet</p>

      <div className="language-selector">
        <div className="btn-group" role="group">
          {programmingLanguages.map((lang) => (
            <Button
              key={lang.id}
              variant={
                selectedLanguage === lang.id ? "primary" : "outline-secondary"
              }
              className="language-button"
              onClick={() => setSelectedLanguage(lang.id)}
              style={{
                backgroundColor:
                  selectedLanguage === lang.id ? lang.color : "transparent",
                borderColor: lang.color,
                color:
                  selectedLanguage === lang.id
                    ? lang.id === "javascript"
                      ? "#333"
                      : "#fff"
                    : theme === "dark"
                    ? "#fff"
                    : "#333",
              }}
            >
              {lang.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="code-description">
        <h5>What you'll get:</h5>
        <ul>
          <li>
            A <strong>{selectedLanguage}</strong> code example following best
            practices
          </li>
          <li>Detailed comments explaining the code</li>
          <li>Practical implementation you can use in projects</li>
          <li>Modern syntax and patterns</li>
        </ul>

        <div className="d-grid gap-2 mt-4">
          <Button
            variant="primary"
            className="generate-button"
            onClick={generateCodeExample}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Generating...
              </>
            ) : (
              "Generate Code Example"
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="floating-ai-button"
        onClick={() => setShowModal(true)}
        aria-label="Open AI Assistant"
      >
        <FaRobot className="robot-icon" />
        <div className="button-tooltip">AI Assistant</div>
      </button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size={isMobile ? "sm" : "lg"}
        className="ai-modal"
        fullscreen={isMobile ? "sm-down" : false}
      >
        <Modal.Header closeButton>
          <Modal.Title>AI Assistant</Modal.Title>
        </Modal.Header>
        <div className="ai-tabs">
          <div
            className={`ai-tab ${activeTab === "chat" ? "active" : ""}`}
            onClick={() => setActiveTab("chat")}
          >
            <FaComment /> {!isMobile && "Chat"}
          </div>
          <div
            className={`ai-tab ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <FaLightbulb /> {!isMobile && "Project Ideas"}
          </div>
          <div
            className={`ai-tab ${activeTab === "code" ? "active" : ""}`}
            onClick={() => setActiveTab("code")}
          >
            <FaCode /> {!isMobile && "Code Examples"}
          </div>
        </div>
        <Modal.Body className="p-0">
          <div className="ai-tab-content">
            {activeTab === "chat" && renderChatTab()}
            {activeTab === "projects" && renderProjectsTab()}
            {activeTab === "code" && renderCodeTab()}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FloatingAIButton;
