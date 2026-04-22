const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const deployRoutes = require('./src/routes/deploy');

const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend (port 3000) to talk to this backend (port 5000)
app.use(express.json()); // Parses incoming JSON data

// Routes
app.use('/api', deployRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 Orchestrator Node running on port ${PORT}`);
    console.log(`========================================\n`);
});