import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Herosection from '../components/Herosection ';
import FooterSection from '../components/Footer';
import FeaturedCollection from '../components/FeaturedCollection';
import axios from 'axios';
import CategorySection from '../components/Categorysection';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get("https://backend-w1xu.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='bg-[#F5F5DC] min-h-screen'>
      <Navbar 
        wishlist={wishlist} 
        cart={JSON.parse(localStorage.getItem("cart")) || []} 
        onLogout={() => localStorage.removeItem("userToken")} 
      />
      <Herosection />
      <CategorySection /> 
      <FeaturedCollection products={products} />
      <FooterSection />
    </div>
  );
};

export default Home;
