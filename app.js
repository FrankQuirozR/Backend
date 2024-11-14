const express = require('express');
const cors = require("cors");
const axios = require('axios');
const https = require('https');
const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Disable SSL/TLS verification in Axios
axios.defaults.httpsAgent = new https.Agent({  
  rejectUnauthorized: false
});

// Use the FRONTEND_URL environment variable
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Use the PORT environment variable
const port = process.env.PORT || 3003;

app.get('/webair', async (req, res) => {
    try {
        const response = await axios.get('https://api.canair.io:8080/dwc/stations');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener datos de canair:', error);
        res.status(500).json({ 
            error: 'Error al obtener datos de las estaciones',
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});