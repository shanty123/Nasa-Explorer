const express = require('express');
const axios = require('axios');
const router = express.Router();

//fetching Mars weather data
router.get('/insight_weather', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/insight_weather/?api_key=${process.env.NASA_API_KEY}&feedtype=json&ver=1.0`
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching NASA API:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch API data' });
  }
});

//Fetching APOD
router.get('/planetary/apod', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod/?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching NASA API:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch API data' });
  }
});

module.exports = router;

