# Mini Agent Hub
[Interface](media/mini-agent-hub-look.png)
A lightweight platform for deploying AI agents with customizable skills and tools. Build, configure, and deploy intelligent agents with modular functionality through an intuitive web interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Available Tools](#available-tools)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Overview

Mini Agent Hub is a framework for creating and deploying AI agents with pluggable tools and capabilities. It enables users to:

- Create custom AI agents through a web interface
- Select and inject skills/tools dynamically (e.g., weather, language tools)
- Deploy agents with template-based configuration
- Execute agent tools in real-time

## Features

✨ **Key Features:**
- 🎯 Simple agent deployment workflow
- 🔧 Pluggable tool/skill system
- 📱 Modern Next.js frontend
- ⚙️ Express backend for agent management
- 🔐 Environment-based configuration
- 📦 Template-based agent creation
- 🌍 Real-world tool integration (e.g., OpenWeatherMap API)

## Architecture

The system follows a three-tier architecture:

```
User Browser (Next.js)
        ↓
Express Server (Backend)
        ↓
Agent Tools & Skills
```

**Flow:**
1. User interacts with the Next.js frontend
2. Frontend sends agent configuration to the Express backend
3. Backend loads the base agent template
4. Backend injects selected skills into the agent configuration
5. Agent is deployed with updated system prompt and capabilities
6. Tools execute against their respective APIs

## Project Structure

```
mini-agent-hub/
├── agents/                    # Agent tools and skills
│   └── weatherTool.js        # Weather API integration
├── backend/                   # Express server & deployment logic
│   ├── src/
│   │   ├── routes/
│   │   │   └── deploy.js     # Agent deployment handler
│   │   └── utils/
│   │       └── encryption.js # Utility functions
│   └── templates/
│       └── baseAgent.json    # Base agent configuration template
├── frontend/                  # Next.js web interface
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   └── public/
│   ├── package.json
│   └── tsconfig.json
├── docs/                      # Documentation
│   └── architecture.md       # Architecture details
├── package.json              # Root package configuration
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (for weather tool)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mahfuz-raihan/mini-agent-hub.git
cd mini-agent-hub
```

2. **Install root dependencies**
```bash
npm install
```

3. **Set up the frontend**
```bash
cd frontend
npm install
```

4. **Configure environment variables**

Create a `.env` file in the root directory:
```env
WEATHER_API_KEY=your_openweathermap_api_key_here
```

### Running the Application

**Development mode:**

Terminal 1 - Start the frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Start the backend:
```bash
# From the root directory
npm start
# or node backend/src/routes/deploy.js
```

The frontend will be available at `http://localhost:3000`

**Build for production:**
```bash
cd frontend
npm run build
npm run start
```

## Usage

### Creating and Deploying an Agent

1. **Access the web interface** - Navigate to `http://localhost:3000`

2. **Configure your agent:**
   - Select desired skills (e.g., "weather")
   - Provide user identification
   - Review the agent configuration

3. **Deploy the agent:**
   - The backend will load the base agent template
   - Selected skills are injected into the configuration
   - System prompt is updated with skill descriptions
   - Agent is ready for deployment

### Example: Weather Skill

The weather tool fetches real-time weather data:

```javascript
const { getWeatherTool } = require('./agents/weatherTool.js');

// Get weather for a location
getWeatherTool('Dhaka').then(result => {
  console.log(result);
  // Output:
  // {
  //   temperature: "28°C",
  //   condition: "Partly cloudy",
  //   description: "scattered clouds",
  //   location: "Dhaka"
  // }
});
```

## Available Tools

### Weather Tool
**File:** `agents/weatherTool.js`

- **Purpose:** Fetch real-time weather information
- **API:** OpenWeatherMap
- **Environment Variable:** `WEATHER_API_KEY`
- **Usage:** Called when agent needs to provide weather information

**Capabilities:**
- Current temperature
- Weather conditions
- Location-based queries

## Development

### Code Structure

- **Backend Routes:** Handle HTTP requests and agent deployment logic
- **Agent Tools:** Modular functions that execute specific tasks
- **Templates:** JSON configurations that define agent behavior
- **Frontend:** React/Next.js UI for user interaction

### Adding a New Tool

1. Create a new tool file in `agents/` directory:
```javascript
// agents/myNewTool.js
async function myNewTool(params) {
  // Tool implementation
  return result;
}
module.exports = { myNewTool };
```

2. Update the deployment handler in `backend/src/routes/deploy.js`:
```javascript
if (userSkills.includes('myNewTool')) {
  baseTemplate.system_prompt += " You have access to my new tool.";
}
```

3. Update `baseTemplate.injected_skills` array

### Testing Tools Locally

Each tool can be tested standalone:

```bash
# Test weather tool
node agents/weatherTool.js
```

Uncomment the test code at the bottom of the tool file.

## Contributing

We welcome contributions! Here's how to help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code structure
- Add tests for new tools
- Update documentation for new features
- Use meaningful commit messages

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Repository

- **GitHub:** https://github.com/mahfuz-raihan/mini-agent-hub
- **Issues:** https://github.com/mahfuz-raihan/mini-agent-hub/issues

---

**Built with ❤️ by the [Mahfuz](https://mahfuz-raihan.netlify.app/) team**