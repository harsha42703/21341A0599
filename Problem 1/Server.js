require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

// Static token
const Token = process.env.ACCESS_TOKEN;

// Allowed companies and categories
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = [
  "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse",
  "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset",
  "Laptop", "PC",
];

// Helper function to check if an item is in a list
function contains(list, item) {
  return list.includes(item);
}

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/products', async (req, res) => {
  try {
    const { company, category } = req.query;
    const top = parseInt(req.query.top) || 10;
    const minPrice = parseInt(req.query.minPrice) || 1;
    const maxPrice = parseInt(req.query.maxPrice) || 10000;

    if (!contains(COMPANIES, company)) {
      return res.status(400).json({ error: 'Invalid company parameter' });
    }

    if (!contains(CATEGORIES, category)) {
      return res.status(400).json({ error: 'Invalid category parameter' });
    }

    if (isNaN(top) || top <= 0) {
      return res.status(400).json({ error: 'Invalid "top" parameter' });
    }

    if (isNaN(minPrice) || minPrice < 0) {
      return res.status(400).json({ error: 'Invalid "minPrice" parameter' });
    }

    if (isNaN(maxPrice) || maxPrice < minPrice) {
      return res.status(400).json({ error: 'Invalid "maxPrice" parameter' });
    }

    const apiURL = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await axios.get(apiURL, {
      headers: {
        'Authorization': `Bearer ${Token}`
      }
    });

    res.status(200).json({ products: response.data });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
