import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productlist from './Components/Productlist';
import ProductPage from './Components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Productlist />} />
        <Route path="/categories/:categoryName/products/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
