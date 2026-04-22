const fs = require('fs');
const path = require('path');

// Simulated Express Route Handler
function handleDeployment(reqBody) {
    console.log("1. Received deployment request:", reqBody);
    
    // 2. Load the base template
    const templatePath = path.join(__dirname, '../../templates/baseAgent.json');
    // check to ensure the template file exists before reading
    if (!fs.existsSync(templatePath)) {
        console.error(`\n[Error] Template file not found at path: ${templatePath}`);
        console.error("-> Fix: Make sure the 'templates' folder is directly inside the 'backend' folder\n")
        return;
    }

    const baseTemplate = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

    // 3. Inject the selected skills (Add-ons)
    const userSkills = reqBody.skills; // e.g., ['weather']
    baseTemplate.injected_skills = userSkills;

    // 4. Update the system prompt dynamically based on skills
    if (userSkills.includes('weather')) {
        baseTemplate.system_prompt += " You have access to a real-time weather tool. Use it when asked about the weather.";
    }

    console.log("2. Final Agent Configuration Ready for Deployment:");
    console.log(JSON.stringify(baseTemplate, null, 2));

    return baseTemplate;
}

// test in locally
const mockFrontendRequest = {
    userId: "user_123",
    skills: ["weather"]
};

handleDeployment(mockFrontendRequest);