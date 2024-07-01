// server.js
const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Fetch and store data
const fetchData = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;
    const top10Tickers = Object.values(tickers).slice(0, 10);

    const client = await pool.connect();
    await client.query('DELETE FROM cryptos'); // Clear previous data

    const queryText = 'INSERT INTO cryptos(name, last, buy, sell, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6)';
    top10Tickers.forEach(async ticker => {
      const values = [ticker.name, ticker.last, ticker.buy, ticker.sell, ticker.volume, ticker.base_unit];
      await client.query(queryText, values);
    });

    client.release();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

app.use(express.static('public'));

app.get('/api/cryptos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cryptos');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchData(); // Initial fetch
  setInterval(fetchData, 60000); // Fetch data every minute
});
