# Portfolio Project

This is my portfolio website project. It showcases my skills, projects, and experiences.

## Description

In this project, I have created a portfolio website to showcase my work as a developer. The website includes information about me, my skills, projects I have worked on, and my contact details.

## Features

- Home page with an introduction and overview of my skills
- Projects page to showcase my completed projects
- Contact page with a form to get in touch with me
- Responsive design for optimal viewing on different devices
- Interactive AI Assistant with chat, project idea generation, and code examples

## Installation

1. Clone the repository: `git clone https://github.com/your-username/portfolio-project.git`
2. Navigate to the project directory: `cd portfolio-project`
3. Install the dependencies: `npm install`
4. Create a `.env.local` file in the root directory and add your API keys:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

## Usage

1. Start the development server: `npm start`
2. Run `npm run dev` to start the server.
3. Open your browser and visit `http://localhost:3000` to view the website.

## AI Assistant

The portfolio includes an interactive AI assistant with the following features:

- **Chat Interface**: Ask questions about my skills, projects, and experience
- **Project Idea Generator**: Get customized project ideas based on selected technologies and complexity level
- **Code Examples**: View code snippets in different programming languages

### API Integration

The AI assistant uses a tiered approach to AI services:
1. **Primary**: OpenAI API (GPT-3.5 Turbo) - Provides high-quality responses
2. **Fallback**: HuggingFace Inference API (Mistral-7B) - More cost-effective alternative
3. **Offline Mode**: Pre-defined responses when no API keys are available

To use the AI features with API integration:
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys) and/or [HuggingFace](https://huggingface.co/settings/tokens)
2. Add the keys to your `.env.local` file
3. Restart the development server

## Technologies

- HTML
- CSS
- JavaScript
- React
- AWS
- OpenAI API / HuggingFace API
- React Bootstrap

## Contact

For any inquiries or feedback, please contact me at [chhabrapranav2001@gmail.com](mailto:chhabrapranav2001@gmail.com).