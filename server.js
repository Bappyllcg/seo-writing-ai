require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next();
});
app.use(cors());

// API Routes
app.use('/api/generate/title', require('./routes/titles'));
app.use('/api/generate/content', require('./routes/content'));
app.use('/api/generate/keywords', require('./routes/keywords'));

// Serve static files from React build
app.use(express.static(path.join(__dirname)));

// Handle SPA routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});