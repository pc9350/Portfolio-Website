import React, { useState, useRef, useEffect, useContext } from "react";
import { Modal, Button, Form, Spinner, Row, Col } from "react-bootstrap";
import {
  FaRobot,
  FaComment,
  FaLightbulb,
  FaCode,
  FaCopy,
  FaMicrophone,
  FaMicrophoneSlash,
  FaThumbsUp,
  FaThumbsDown,
  FaRegSmile,
  FaTrash,
  FaArrowRight,
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

    // Regular text - Now we'll also process URLs in this part
    return {
      type: "text",
      content: part,
    };
  });
};

// Function to sanitize AI responses to fix any URL formatting issues
const sanitizeAIResponse = (response) => {
  if (!response) return '';
  
  // First, fix markdown links with repeated URLs
  let sanitized = response;
  
  // Fix the pattern [text](url)url
  sanitized = sanitized.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\s*\2/g, '[$1]($2)');
  
  // Fix the pattern [text](url)https://... where the second URL starts the same but might be different
  sanitized = sanitized.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\s*(https?:\/\/[^\s\)]+)/g, (match, text, url1, url2) => {
    // If url2 is the same as url1, remove it
    if (url2.startsWith(url1)) {
      return `[${text}](${url1})`;
    }
    // Otherwise keep both
    return `[${text}](${url1}) ${url2}`;
  });
  
  // Fix bizarre repeated URLs like GitHubhttps://...
  sanitized = sanitized.replace(/(GitHub|Demo|Live|Web\s*App)(https?:\/\/[^\s\)]+)/gi, (match, text, url) => {
    return `${text} ${url}`;
  });
  
  // Fix URLs that are repeated immediately after themselves
  sanitized = sanitized.replace(/(https?:\/\/[^\s\)]+)\s*\1/g, '$1');
  
  // Fix the pattern [GitHub](github-url)[https://github-url] with merged square brackets
  sanitized = sanitized.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\[(https?:\/\/[^\s\]]+)\]/g, '[$1]($2)');

  // Fix the pattern [GitHub]https://github-url with missing parentheses
  sanitized = sanitized.replace(/\[([^\]]+)\](https?:\/\/[^\s\)]+)/g, '[$1]($2)');

  // Fix URLs that look like [GitHubhttps://...] with missing parenthesis
  sanitized = sanitized.replace(/\[(GitHub|Demo|Live|Web\s*App)(https?:\/\/[^\s\]]+)\]/gi, '[$1]($2)');
  
  return sanitized;
};

// Helper function to detect URLs in text and make them clickable
const formatTextWithLinks = (text) => {
  if (!text) return null;
  
  // Handle markdown links first: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  let match;
  const elements = [];
  let lastIndex = 0;
  
  // Process all markdown links
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      elements.push(<span key={`text-${lastIndex}`}>{processPureText(beforeText)}</span>);
    }
    
    // Add the link
    const [fullMatch, linkText, url] = match;
    elements.push(
      <a 
        key={`link-${match.index}`} 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="chat-link"
      >
        {linkText}
      </a>
    );
    
    lastIndex = match.index + fullMatch.length;
  }
  
  // Add remaining text and process any plain URLs in it
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    elements.push(<span key={`text-final`}>{processPureText(remainingText)}</span>);
  }
  
  return elements.length > 0 ? elements : text;
};

// Process plain text to find and link bare URLs
const processPureText = (text) => {
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  let match;
  const elements = [];
  let lastIndex = 0;
  
  // Find all bare URLs in the text
  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    
    // Add the URL as a link
    const url = match[0];
    elements.push(
      <a 
        key={`url-${match.index}`} 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="chat-link"
      >
        {url}
      </a>
    );
    
    lastIndex = match.index + url.length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }
  
  return elements.length > 0 ? elements : text;
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
  
  // New state variables for enhanced features
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Tell me about Captionator",
    "What projects use React?", 
    "GitHub and LinkedIn links"
  ]);
  const [messageReactions, setMessageReactions] = useState({});
  
  // Reference for speech recognition
  const recognitionRef = useRef(null);

  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Error loading saved messages");
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

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

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.response) {
          return data.response;
        }

        // Extract the content based on the response structure from your Lambda
        if (data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content;
          return content;
        }

        // Fall through to HuggingFace if OpenAI didn't return expected format
      } catch (error) {
        console.warn("OpenAI API failed, falling back to HuggingFace");
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
      console.error("AI API Error");
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
      return "Pranav's projects include Captionator (an AI-powered caption generation app available on iOS App Store and Google Play Store - iOS: https://apps.apple.com/us/app/captionator-caption-generator/id6743040694, Android: https://play.google.com/store/apps/details?id=com.captionator.app&hl=en_US), LLM Evaluation Platform (https://llm-evaluation-platform-xi.vercel.app/), NeuroLens for brain tumor classification (https://pranavch-neurolens-brain-tumor.hf.space/), ChatterBox messaging platform (https://chatterbox-silk.vercel.app/), and Phonicsjoy phonics website (https://phonicsjoy.com/). For more projects, check out his GitHub at https://github.com/pc9350.";
    } else if (
      promptLower.includes("contact") ||
      promptLower.includes("email") ||
      promptLower.includes("social") ||
      promptLower.includes("linkedin") ||
      promptLower.includes("github")
    ) {
      return "You can contact Pranav through the Contact form in this portfolio, via email at chhabrapranav2001@gmail.com, connect on LinkedIn at https://www.linkedin.com/in/pranavchhabra/, or check out his code repositories on GitHub at https://github.com/pc9350.";
    } else if (
      promptLower.includes("code") ||
      promptLower.includes("example")
    ) {
      return "I can provide code examples in JavaScript, TypeScript, Python, React, and more. Try asking for a specific example like 'Show me a React component for a counter' or 'Give me a Python function for data processing'.";
    } else if (
      promptLower.includes("captionator") ||
      promptLower.includes("caption") ||
      (promptLower.includes("app") && promptLower.includes("ios"))
    ) {
      return "Captionator is Pranav's featured mobile app for AI-powered caption generation, now available on both iOS and Android! It analyzes images and videos to generate creative, engaging social media captions with customizable tones and viral potential scoring. You can download it from the App Store (https://apps.apple.com/us/app/captionator-caption-generator/id6743040694), Google Play Store (https://play.google.com/store/apps/details?id=com.captionator.app&hl=en_US), or use the web version at https://captionator-caption-generator.vercel.app/. The source code is available on GitHub: https://github.com/pc9350/Captionator_caption_generator.git";
    } else {
      return "Try asking about Pranav's skills, work experience, education, projects, or request code examples! You can also ask for his social media links or specific project details.";
    }
  };

  // Speech recognition setup
  const setupSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };
  
  // Toggle speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setupSpeechRecognition();
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };
  
  // Add reaction to a message
  const addReaction = (messageIndex, reaction) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageIndex]: reaction
    }));
  };
  
  // Use a suggestion
  const useSuggestion = (suggestion) => {
    setInput(suggestion);
  };
  
  // Clear chat history
  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
    }
  };

  // Handle chat form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    const systemPrompt = `You are an AI assistant embedded in Pranav Chhabra's portfolio website. Provide helpful, concise responses about Pranav's skills, projects, and coding knowledge. When providing code examples, always wrap them in triple backticks with the language specified (e.g. \`\`\`javascript). When providing links, use proper markdown format [link text](url) and ensure you don't repeat the URL after the markdown link. Keep responses under 150 words.

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

PROJECTS (WITH LINKS):
- Captionator (Featured Project)
  * AI-powered caption generation app available on iOS App Store, Google Play Store, and web
  * Analyzes images/videos to generate creative captions with customizable tones
  * Features viral potential scoring and caption history management
  * iOS App Store: https://apps.apple.com/us/app/captionator-caption-generator/id6743040694
  * Google Play Store: https://play.google.com/store/apps/details?id=com.captionator.app&hl=en_US
  * Web App: https://captionator-caption-generator.vercel.app/
  * GitHub: https://github.com/pc9350/Captionator_caption_generator.git

- LLM Evaluation Platform
  * Next.js + TypeScript platform for parallel LLM evaluation (GPT-4, Llama-70B, Mixtral)
  * Recharts analytics dashboard for real-time cost, token usage, and response time visualization
  * Live Demo: https://llm-evaluation-platform-xi.vercel.app/ 
  * GitHub: https://github.com/pc9350/LLM-Evaluation-platform

- NeuroLens: Brain Tumor Classification
  * AI model for classifying brain tumors in MRI scans with ~94% accuracy (custom CNN) and ~99.5% accuracy (Xception model)
  * Enhanced model interpretability with Gemini 1.5 Flash for saliency maps
  * Demo: https://pranavch-neurolens-brain-tumor.hf.space/
  * GitHub: https://github.com/pc9350/neurolens_brain_tumor_classification

- Customer Churn Prediction App (Churn Crunch)
  * Full-stack churn prediction platform using Streamlit, Replit, and machine learning models
  * Enhanced model accuracy from 75% to 85% through feature engineering and SMOTE
  * Embedded Groq API for automated personalized email generation
  * Demo: https://churncrunch.streamlit.app/
  * GitHub: https://github.com/pc9350/Customer-Churn-Prediction

- Phonicsjoy: Phonics Teaching Website
  * Phonics teaching website using React and Supabase with AI-generated phonics stories
  * Improved user interaction by 20% through customized phonics learning journeys
  * Live Demo: https://phonicsjoy.com/
  * GitHub: https://github.com/pc9350/phonics-story-generator

- ChatterBox: Real-time Messaging Platform
  * Discord-inspired platform built with TypeScript, Next.js, and Convex
  * Features real-time messaging and seamless connections
  * Demo: https://chatterbox-silk.vercel.app/
  * GitHub: https://github.com/pc9350/ChatterBox-Discord_Clone

- Pull Request Buddy
  * AI-powered automated PR review assistant with multi-language support
  * GitHub integration for enhanced code quality
  * GitHub: https://github.com/pc9350/PullRequestBuddy-AI-Review-Bot

- AI Chrome Extension
  * Browser extension providing AI-powered text suggestions 
  * Uses Cerebras' Llama 3.1-8B model and Google's Gemini Nano
  * GitHub: https://github.com/pc9350/AI-autocomplete-extension

- Market Anomaly Detection
  * Early warning system for potential market crashes using ML and LLMs
  * GitHub: https://github.com/pc9350/Market-Anomaly-Detection

- Profscore: Professor Rating Platform
  * AI-driven platform for professor ratings and search
  * Demo: https://profscore-beta.vercel.app/
  * GitHub: https://github.com/pc9350/Rate-my-professor

- IntelliAid: AI Customer Support Chatbot
  * Chatbot for TrendyThreads using AWS Bedrock
  * Demo: http://ec2-3-92-47-86.compute-1.amazonaws.com/
  * GitHub: https://github.com/pc9350/IntelliAid-AI-Customer-Support

- PantryPal: Pantry Management System
  * Pantry management with AI recipe suggestions and image recognition
  * Demo: https://pantrypal-eosin.vercel.app/
  * GitHub: https://github.com/pc9350/Pantry_Management_System

SOCIAL MEDIA AND CONTACT:
- LinkedIn: https://www.linkedin.com/in/pranavchhabra/
- GitHub: https://github.com/pc9350
- Email: chhabrapranav2001@gmail.com

When asked about Pranav's projects or social media, always include the relevant links. For projects, mention the GitHub repository and live demo links when available. For social media, provide the direct links to his profiles. When asked about Pranav's experience, skills, or background, use this information to provide accurate responses and make sure to get his name right every time.`;

    const aiResponse = await callAI(input, systemPrompt);

    if (aiResponse) {
      // Sanitize the response to fix any URL formatting issues
      const sanitizedResponse = sanitizeAIResponse(aiResponse);
      setMessages((prev) => [...prev, { text: sanitizedResponse, sender: "ai" }]);
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
      "You are a creative project idea generator. Your task is to generate NEW project ideas based on the technologies provided. DO NOT describe or mention Pranav's existing portfolio projects. Instead, create entirely new project concepts that someone could build. Format your response with a title, description, key features (4-5 bullet points), learning outcomes (3-4 bullet points), and implementation steps (3-4 bullet points). When providing links, use proper markdown format [link text](url) and do not repeat the URL after the markdown link.";

    const prompt = `Generate a completely new ${projectComplexity} complexity project idea using these technologies: ${selectedTechs.join(
      ", "
    )}. This should be a project that hasn't been built yet - NOT one of Pranav's existing portfolio projects. Include a creative title, detailed description, key features, learning outcomes, and basic implementation steps. Format your response with clear sections.`;

    const aiResponse = await callAI(prompt, systemPrompt);

    if (aiResponse) {
      // Sanitize the response to fix any URL formatting issues
      const sanitizedResponse = sanitizeAIResponse(aiResponse);
      setMessages((prev) => [...prev, { text: sanitizedResponse, sender: "ai" }]);
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
      "You are a coding instructor specializing in providing educational code examples. Your task is to create clean, well-commented code examples that follow best practices. DO NOT describe Pranav's portfolio projects or existing code. Instead, create new, reusable code snippets that demonstrate programming concepts. Always wrap code examples in triple backticks with the language specified (e.g. ```javascript). When providing links, use proper markdown format [link text](url) and do not repeat the URL after the markdown link.";

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
      // Sanitize the response to fix any URL formatting issues
      const sanitizedResponse = sanitizeAIResponse(aiResponse);
      setMessages((prev) => [...prev, { text: sanitizedResponse, sender: "ai" }]);
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

  // Render chat tab content with enhanced features
  const renderChatTab = () => (
    <div className="chat-tab">
      <div className="chat-header">
        <div className="suggestions-row">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-chip"
              onClick={() => useSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        <Button 
          variant="outline-danger" 
          size="sm" 
          className="clear-chat-btn" 
          onClick={clearChat}
          title="Clear chat history"
        >
          <FaTrash /> Clear
        </Button>
      </div>
      
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
                      // Process each line to find and format links
                      return part.content
                        .split("\n")
                        .map((line, i) => (
                          <p key={`${partIndex}-${i}`} className="message-paragraph">
                            {formatTextWithLinks(line)}
                          </p>
                        ));
                    }
                  }
                )}
              </div>
              
              {msg.sender === 'ai' && (
                <div className="message-reactions">
                  <Button 
                    variant="link" 
                    className={`reaction-btn ${messageReactions[index] === 'like' ? 'active' : ''}`}
                    onClick={() => addReaction(index, 'like')}
                    title="Helpful"
                  >
                    <FaThumbsUp />
                  </Button>
                  <Button 
                    variant="link" 
                    className={`reaction-btn ${messageReactions[index] === 'dislike' ? 'active' : ''}`}
                    onClick={() => addReaction(index, 'dislike')}
                    title="Not helpful"
                  >
                    <FaThumbsDown />
                  </Button>
                  <Button 
                    variant="link" 
                    className={`reaction-btn ${messageReactions[index] === 'thanks' ? 'active' : ''}`}
                    onClick={() => addReaction(index, 'thanks')}
                    title="Thanks!"
                  >
                    <FaRegSmile />
                  </Button>
                </div>
              )}
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
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            disabled={isLoading}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </Button>
          <Button
            type="submit"
            className="send-button"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <FaArrowRight />
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
        <span className="new-badge">NEW</span>
        <FaRobot className="robot-icon" />
        <div className="button-tooltip">Ask me anything!</div>
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
          <Modal.Title>
            <span className="assistant-title">Pranav's AI Assistant</span>
            <span className="assistant-subtitle">Ask about projects, skills, or get code samples</span>
          </Modal.Title>
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
