import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Herosection from '../components/herosection '
import FooterSection from '../components/Footer'
import FeaturedCollection from '../components/featuredcollection'
import axios from 'axios'
const Home = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([])
  // const [searchQuery, setSearchQuery] = useState("") 
  
  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Navbar 
        wishlist={wishlist} 
        cart={JSON.parse(localStorage.getItem("cart")) || []} 
        onLogout={() => localStorage.removeItem("userToken")} 
        // searchQuery={searchQuery}        
        // setSearchQuery={setSearchQuery}  
      />
      <Herosection
      //  searchQuery={searchQuery}
        /> 
        <FeaturedCollection products={products} />
        <FooterSection/>
    </div>
  )
}

export default Home
