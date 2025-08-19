import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

  const Herosection = () => {
  const navigate=useNavigate()
  const goToProducts=()=>navigate("/products")


  const heroImgs=["http://packingsolution.co.uk/cdn/shop/articles/Eco-Friendly-Packing-boxes.jpg?v=1684482317",
  "http://purpleplumeria.com/cdn/shop/articles/Biodegradable_packaging_options_created_with_natural_and_organic_materials_for_a_more_sustainable_and_eco_friendly_household.jpg?v=1698016640",
  "https://thumbs.dreamstime.com/b/natural-aesthetic-eco-friendly-flat-lay-organic-wooden-paper-cutlery-bark-tree-pebbles-sustainable-zero-waste-plastic-free-270164911.jpg"]

  const [index,setIndex]=useState(0)


  useEffect(()=>{
  const interval=setInterval(()=>{setIndex((prev)=>(prev+1)%heroImgs.length)},5000)
  return ()=>clearInterval(interval)},[heroImgs.length])
  return (
    <section className=" h-screen bg-center bg-cover flex flex-col items-center justify center transition -all duration -1000 ease-in-out"  style={{
        backgroundImage:
          `url(${heroImgs[index]})`,
      }}>
        
      <h1 className="text-center text-4xl sm:text-5xl  md:text-[70px] mt-24 inline-block max-w-3xl font-semibold pt-10  text-stone-800 ">
       Explore your hub for eco-friendly essentials
      </h1>
      <p className="text-lg">Sustainable living starts here.Discover eco-friendly for a greener tommorrow</p>

      <button className="bg-green-600 text-white px-6 py-3 mt-6 rounded-lg border border-green-700 hover:bg-green-700 transition font-serif " onClick={goToProducts}>
        Shop Now
      </button>
    </section>
  );
};

export default Herosection;

