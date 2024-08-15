import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('AMZ');  // Default company
  const [category, setCategory] = useState('Laptop'); // Default category
  const [sortBy, setSortBy] = useState('price');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products', {
        params: {
          company,
          category,
          top: n,
          minPrice,
          maxPrice,
          sortBy,
          sortDir,
          page,
        },
      });
      setProducts(response.data.products); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [company, category, sortBy, sortDir, page, n, minPrice, maxPrice]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="Phone">Phone</MenuItem>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="TV">TV</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="discount">Discount</MenuItem>
              {/* Add more sort options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sort Direction</InputLabel>
            <Select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Products Per Page"
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="primary" onClick={fetchProducts}>
            Apply Filters
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.productName}
                </Typography>
                <Typography color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography color="textSecondary">
                  Rating: {product.rating}
                </Typography>
                <Typography color="textSecondary">
                  Discount: {product.discount}%
                </Typography>
                <Typography color={product.availability === 'yes' ? 'textPrimary' : 'error'}>
                  Availability: {product.availability}
                </Typography>
                <Button variant="outlined" color="primary" href={`/products/${product.id}`}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productlist;
