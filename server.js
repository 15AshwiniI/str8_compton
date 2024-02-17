const express = require('express');
const path = require('path');
const app = express();

// Load environment variables
require('dotenv').config();

// Serve static files
app.use(express.static(path.join(__dirname, '/Users/ashwiniiyer/Documents/Coding_Projects/CodeFleet/')));

// Route to render the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Users/ashwiniiyer/Documents/Coding_Projects/CodeFleet/', 'webpage.html'));
});

// Endpoint to send the API key to the client-side code
app.get('/api-key', (req, res) => {
    console.log('getting key');
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not found' });
    } else {
        console.log('got key');
    }
    res.json({ apiKey });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
