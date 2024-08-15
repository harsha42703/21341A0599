import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

const ProductPage = () => {
  const { categoryName, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        params: {
          company: 'AMZ',  
          category: categoryName,
          top: 1,  
          minPrice: 0,
          maxPrice: 10000,
          sortBy: 'price',  
          sortDir: 'asc',   
          page: 1
        }
      });

      const product = response.data.products.find(p => p.id === parseInt(productId, 10));
      setProduct(product);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Error fetching product details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [categoryName, productId]);

  if (loading) return <Typography variant="h6" component="h2">Loading...</Typography>;
  if (error) return <Typography variant="h6" component="h2">{error}</Typography>;

  return (
    <Container>
      {product ? (
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.productName}
            </Typography>
            <Typography color="textSecondary">
              Company: {product.company}
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
            <Typography color="textSecondary">
              Availability: {product.availability}
            </Typography>
            <Typography color="textSecondary">
              Description: {product.description}
            </Typography>
            <Button variant="contained" color="primary" href={`/products/${product.id}`}>
              View More Details
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" component="h2">
          Product not found
        </Typography>
      )}
    </Container>
  );
};

export default ProductPage;
