require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { topic, wordCount } = req.body;
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a comprehensive SEO-optimized blog post about ${topic} minimum ${wordCount} words Readability score will be 8th & 9th grade, easily understood and the content feels like human written in HTML format. Include:
              Don't add any <br> tags
              Don't write any javascript code
              Don't add any CSS code
              Don't add any <style> tags
              Don't add any <script> tags
              Don't add any <meta> tags
              Don't add any <title> tags
              Don't add any <h1> tags
              You can add <h2> - <h6> tags
              You can add <p> tags
              You can add <blockquote> tags
              You can add <ul> tags
              You can add <ol> tags
              You can add <img> tags
              You can add <table> tags
              Content should be wrapped inside:
              <div class="main-inner">
                <h2>Heading 2</h2>
                <p>Paragraph 1</p>
                <blockquote>Blockquote</blockquote>
                <h2>Heading 3</h2>
                <p>Paragraph 2</p>
                <h3>Heading 4</h3>
                <p>Paragraph 3</p>
                <p>Paragraph 4</p>
                <blockquote>Blockquote</blockquote>
                <h3>Heading 5</h3>
                <p>Paragraph 5</p>
                <p>Paragraph 6</p>
                <div class="faq-accordion" itemscope itemtype="http://schema.org/FAQPage">
                  <div class="faq-accordion-item" itemprop="mainEntity" itemscope itemtype="http://schema.org/Question">
                    <h4 class="ts-faq-item-question" itemprop="name">Question?</h4>
                    <div itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
                      <p itemprop="text">Answer</p>
                    </div>
                  </div>
                  <div class="faq-accordion-item" itemprop="mainEntity" itemscope itemtype="http://schema.org/Question">
                    <h4 class="ts-faq-item-question" itemprop="name">Question?</h4>
                    <div itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
                      <p itemprop="text">Answer</p>
                    </div>
                  </div>
                </div>
              </div>
              If possible add more than 1 paragraph in each section. and please it will feels like human written.`
          }]
        }]
      }
    );

    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Validate HTML structure
    // if (!responseText.includes('<!DOCTYPE html>') || 
    //     !responseText.includes('<head>') || 
    //     !responseText.includes('<body>')) {
    //   throw new Error('Invalid HTML formatting from API');
    // }

    res.json({ content: responseText });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = router;