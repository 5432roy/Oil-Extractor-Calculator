const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configure the CORS proxy middleware
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://poe.ninja',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api/data/itemoverview?league=Crucible&type=Oil',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  })
);

// Fetch the URL within the server route
app.get('/fetch-data', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// // Fetching the data for the oils price
// // ** blocked by CORS policy **
// fetch('https://poe.ninja/api/data/itemoverview?league=Crucible&type=Oil')
//   .then(response => response.json())
//   .then(data => {
//     // process the data here
//     console.log(data);
//   })
//   .catch(error => console.error(error));

// Get all slider inputs and slider value elements
const sliders = document.querySelectorAll('.slider');
const sliderValues = document.querySelectorAll('.slider-value');

// Add event listeners to all sliders
sliders.forEach((slider, index) => {
  sliderValues[index].textContent = slider.id;
  slider.addEventListener('input', () => {
    // Update the slider value element with the current slider value
    sliderValues[index].textContent = slider.value;
  });
});
