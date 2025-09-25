import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Herosection = () => {
  const navigate = useNavigate();
  const goToProducts = () => navigate("/products");

  const slides = [
    {
      img: "http://packingsolution.co.uk/cdn/shop/articles/Eco-Friendly-Packing-boxes.jpg?v=1684482317",
      headline: "Eco-Friendly Packaging Solutions",
      subtext: "Choose sustainable options that reduce waste and protect our planet.",
    },
    {
      img: "http://purpleplumeria.com/cdn/shop/articles/Biodegradable_packaging_options_created_with_natural_and_organic_materials_for_a_more_sustainable_and_eco_friendly_household.jpg?v=1698016640",
      headline: "Biodegradable & Natural Materials",
      subtext: "Bring home products crafted with nature in mind for a healthier lifestyle.",
    },
    {
      img: "https://thumbs.dreamstime.com/b/natural-aesthetic-eco-friendly-flat-lay-organic-wooden-paper-cutlery-bark-tree-pebbles-sustainable-zero-waste-plastic-free-270164911.jpg",
      headline: "Sustainable Living Essentials",
      subtext: "Discover zero-waste alternatives to everyday products for a greener tomorrow.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[70vh] w-full flex items-center justify-center text-center overflow-hidden rounded-b-3xl shadow-xl">
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.img})` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-snug drop-shadow-lg tracking-tight transition-all duration-700">
          {slides[index].headline}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md transition-all duration-700">
          {slides[index].subtext}
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={goToProducts}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#556B2F] to-[#6B8E23] hover:from-[#6B8E23] hover:to-[#808000] text-white text-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
