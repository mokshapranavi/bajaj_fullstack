const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Full Stack API. Use POST /api/bfhl to process data.',
    operation_code: 1
  });
});

// GET endpoint for /bfhl
app.get('/api/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// POST endpoint for /bfhl
app.post('/api/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array."
      });
    }

    // Initialize arrays
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const alphaChars = [];

    // Process each item in the data array
    data.forEach(item => {
      const strItem = String(item).trim();
      
      // Check if it's a number
      if (!isNaN(strItem) && strItem !== '') {
        const num = Number(strItem);
        sum += num;
        
        if (num % 2 === 0) {
          evenNumbers.push(strItem);
        } else {
          oddNumbers.push(strItem);
        }
      } 
      // Check if it's an alphabet character
      else if (/^[a-zA-Z]$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
        alphaChars.push(strItem);
      } 
      // Check if it's a multi-character alphabet string
      else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
        strItem.split('').forEach(char => alphaChars.push(char));
      }
      // Otherwise, it's a special character
      else {
        specialCharacters.push(strItem);
      }
    });

    // Create concatenated string in reverse order with alternating caps
    let concatString = '';
    for (let i = alphaChars.length - 1; i >= 0; i--) {
      const char = alphaChars[i];
      if ((alphaChars.length - 1 - i) % 2 === 0) {
        concatString += char.toUpperCase();
      } else {
        concatString += char.toLowerCase();
      }
    }

    // Response object
    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sum),
      concat_string: concatString
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// Export the Express API for Vercel
module.exports = app;