import React from 'react'

const ProductCard = ({ name, price, image, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-56 text-center m-3 transition hover:shadow-lg">
   <img src={image}  alt={name} className="w-full h-40 object-cover rounded-lg"/>
   <h3 className="text-lg font-semibold mt-3 text-gray-800">{name}</h3>
   <p className="text-green-600 font-medium mt-1">Price:${price}</p>
   <button onClick={onAddToCart} className="mt-3 w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition">Add to Cart</button>
    </div>
  )
}

export default ProductCard
