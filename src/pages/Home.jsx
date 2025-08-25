import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Herosection from '../components/herosection '
import FooterSection from '../components/Footer'

const Home = () => {
  const [wishlist, setWishlist] = useState([])
  // const [searchQuery, setSearchQuery] = useState("") 

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
       
        <FooterSection/>
    </div>
  )
}

export default Home
