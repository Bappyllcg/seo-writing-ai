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
            text: `Generate 5 SEO-optimized blog titles and meta descriptions about ${topic}. Return as a JSON object with an array of titles, where each item contains a title and meta_description field. Format the response like this example:
            {
                "title": "Title 1",
                "meta_description": "Description 1"
            },
            {
                "title": "Title 2",
                "meta_description": "Description 2"
            }`
          }]
        }]
      }
    );

    const responseText = response.data.candidates[0].content.parts[0].text;
    const titles = JSON.parse(responseText.replace(/```json|```/g, ''));
    res.json({ titles });
    console.log('Generated titles:', titles);
  } catch (error) {
    console.error('Title generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate titles',
      details: error.message
    });
  }
});

module.exports = router;