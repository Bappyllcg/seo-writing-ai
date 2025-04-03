require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    if (!req.body || !req.body.topic) {
  return res.status(400).json({ error: 'Missing required topic field' });
}
const { topic } = req.body;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate 10 SEO keywords related to ${topic}. Return as a JSON array.`
          }]
        }]
      }
    );

    const responseText = response.data.candidates[0].content.parts[0].text;
    const keywordsArray = JSON.parse(responseText.match(/\[([\s\S]*)\]/)[0]);
    res.json({ keywords: keywordsArray });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate keywords' });
  }
});

module.exports = router;