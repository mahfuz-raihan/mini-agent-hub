const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { orchestrateDeployment } = require('../services/orchestrator');

router.post('/deploy', async (req, res) => {
    try {
        const { skills } = req.body;
        console.log(`[API] Received deployment request for skills:`, skills);

        // 1. Build the Configuration (Logic from Week 2)
        const templatePath = path.join(__dirname, '../../templates/baseAgent.json');

        if (!fs.existsSync(templatePath)) {
            console.error(`[ERROR] System could not find the template at: ${templatePath}`);
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const baseTemplate = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
        baseTemplate.injected_skills = skills || [];

        // 2. Send it to the Orchestrator (Logic for Week 3)
        const deploymentStatus = await orchestrateDeployment(baseTemplate);

        res.status(200).json({ 
            success: true, 
            message: "Agent deployment queued successfully",
            status: deploymentStatus
        });

    } catch (error) {
        console.error("[API Error]:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;