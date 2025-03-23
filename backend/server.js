const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to fetch standings
app.get('/standings', async (req, res) => {
  const { country, league, team } = req.query;

  try {
    const response = await axios.get('https://apiv3.apifootball.com/', {
      params: {
        action: 'get_standings',
        country,
        league,
        team,
        APIkey: process.env.API_KEY, // Use API key from environment variables
      },
    });

    if (response.data && response.data.length > 0) {
      res.json(response.data[0]); // Return the first item in the response
    } else {
      res.status(404).json({ error: 'No data found for the provided inputs.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});