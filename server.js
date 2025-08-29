const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
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
        // Add the uppercase version to alphabets array
        alphabets.push(strItem.toUpperCase());
        // Split into individual characters for concatenation
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
      user_id: "john_doe_17091999", // Replace with your actual user_id
      email: "john@xyz.com", // Replace with your email
      roll_number: "ABCD123", // Replace with your roll number
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

// GET endpoint (optional, for testing)
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});