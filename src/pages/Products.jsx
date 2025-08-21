import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useState,useEffect } from 'react'
import {  useNavigate } from "react-router-dom";
import axios from 'axios'
import ProductCard from '../components/ProductCard';

const Products = () => {
  // const { id } = useParams()
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const navigate=useNavigate()

  useEffect(()=>{

    const fetchProducts=async()=>{
      try{
      const res=await axios.get("http://localhost:3000/products")
      setProducts(res.data)}
      catch(error){
      setError("Failed to load products")}
      finally{
      setLoading(false);
      }}
    fetchProducts()},[])

   const handleAddToCart=(product)=>{
    const  cart=JSON.parse(localStorage.getItem("cart"))||[]
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.title}added to cart`)
   }

   const handleViewDetails=(id)=>{
    navigate(`/products/${id}`)
   }


   if(loading)return<p>Loading products...</p>
   if(error)return <p>{error}</p>

  return (
    <div>
    <Navbar/>
    
      {products.map((p)=>(
      <ProductCard
       key={p.id}
       id={p.id}
       name={p.title}
       price={p.price}
       image={p.image}
      //  description={p.description}
       onAddToCart={handleAddToCart}/>
      ))}
    
    </div>
  )
}

export default Products
