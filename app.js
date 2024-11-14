const express = require('express');
const cors = require("cors");
const axios = require('axios');
const app = express();

// Usa la variable de entorno FRONTEND_URL
app.use(cors({
    origin: '*'//process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Usa la variable de entorno PORT
const port = process.env.PORT || 3003;

app.get('/webair', async (req, res) => {
    try {
        const response = await axios.get('http://api.canair.io:8080/dwc/stations');
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