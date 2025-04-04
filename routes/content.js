require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { topic, wordCount } = req.body;
    
    const initialResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate a comprehensive SEO-optimized blog post about ${topic} minimum ${wordCount} words. Include:
              - Proper HTML structure with <h2>-<h6> headings
              - Multiple paragraphs per section
              - Natural language transitions
              - Varied sentence structure
              - Related FAQs where applicable
              - Example:
                <div class="main-inner">
                  <p style="color: red">Add a image here about: (somthing)</p>
                  <h2>Heading 2</h2>
                  <p>Paragraph 1</p>
                  <blockquote>Blockquote</blockquote>
                  <h2>Heading 3</h2>
                  <p>Paragraph 2</p>
                  <p style="color: red">Add a image here about: (somthing)</p>
                  <h3>Heading 4</h3>
                  <p>Paragraph 3</p>
                  <p>Paragraph 4</p>
                  <blockquote>Blockquote</blockquote>
                  <h3>Heading 5</h3>
                  <p>Paragraph 5</p>
                  <p>Paragraph 6</p>
                  <p style="color: red">Add a image here about: (somthing)</p>
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
                </div>`
          }]
        }]
      }
    );

    let responseText = initialResponse.data.candidates[0].content.parts[0].text;

    const humanizedResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Rewrite this content to enhance human-like quality while maintaining SEO optimization and HTML structure:\n\n${responseText}\n\nInstructions:\n- Use natural transitions between ideas\n- Vary sentence length and structure\n- Add conversational phrases where appropriate\n- Maintain 5th-8th grade readability\n- Preserve all HTML tags and formatting\n- Remove any robotic or repetitive patterns. and don't add any other tags like meta tags, css style, title and js script tags`
          }]
        }]
      }
    );

    const finalContent = humanizedResponse.data.candidates[0].content.parts[0].text;

    // if (!finalContent.match(/<h2>[\s\S]*<\/h6>/)) {
    //   throw new Error('Missing required heading hierarchy');
    // }

    // if (!finalContent.match(/<div class="main-inner">[\s\S]*<\/div>/)) {
    //   throw new Error('Missing main content container');
    // }

    // Validate HTML structure
    // if (!finalContent.includes('<!DOCTYPE html>') || 
    //     !finalContent.includes('<head>') || 
    //     !finalContent.includes('<body>')) {
    //   throw new Error('Invalid HTML structure from API');
    // }

    res.json({ content: finalContent });
  } catch (error) {
    res.status(500).json({ 
      error: 'Content generation failed',
      details: error.message + 'Bappy'
    });
  }
});

module.exports = router;