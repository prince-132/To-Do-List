// Import necessary modules
const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres', // Database user
  host: 'localhost', // Database host
  database: 'quad_db', // Database name
  password: 'manav12345', // Database password
  port: 5432, // Database port
});

// Function to fetch and store data
const fetchData = async () => {
  try {
    // Fetch data from the WazirX API
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;
    const top10Tickers = Object.values(tickers).slice(0, 10); // Get top 10 tickers

    // Connect to the PostgreSQL database
    const client = await pool.connect();
    await client.query('DELETE FROM cryptos'); // Clear previous data

    // Query text to insert data into the 'cryptos' table
    const queryText = 'INSERT INTO cryptos(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)';
    for (const ticker of top10Tickers) {
      const values = [
        ticker.name,
        parseFloat(ticker.last),
        parseFloat(ticker.buy),
        parseFloat(ticker.sell),
        parseFloat(ticker.volume),
        ticker.base_unit
      ];
      await client.query(queryText, values); // Insert data into the database
    }

    client.release(); // Release the database client
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
  }
};

// Serve static files from the 'Public' directory
app.use(express.static('Public'));

// API endpoint to get cryptos data
app.get('/api/cryptos', async (req, res) => {
  try {
    // Connect to the PostgreSQL database
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cryptos'); // Fetch all data from the 'cryptos' table

    // Map the data to the required format
    const data = result.rows.map((crypto, index) => {
      const buyPrice = parseFloat(crypto.buy);
      const sellPrice = parseFloat(crypto.sell);
      const difference = ((sellPrice - buyPrice) / buyPrice) * 100;
      const savings = difference > 0 ? (difference * buyPrice) / 100 : 0;

      return {
        index: index + 1, // Add index for each crypto
        platform: crypto.name,
        lastTradedPrice: `₹ ${parseFloat(crypto.last).toFixed(2)}`,
        buyPrice: `₹ ${buyPrice.toFixed(2)}`,
        sellPrice: `₹ ${sellPrice.toFixed(2)}`,
        difference: difference.toFixed(2),
        savings: `₹ ${savings.toFixed(2)}`
      };
    });

    res.json(data); // Send the formatted data as JSON
    client.release(); // Release the database client
  } catch (error) {
    console.error('Error fetching data from database:', error); // Log any errors
    res.status(500).send('Server error'); // Send a server error response
  }
});

// Start the server and set it to fetch data initially and every minute
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchData(); // Initial fetch of data
  setInterval(fetchData, 60000); // Fetch data every minute
});
