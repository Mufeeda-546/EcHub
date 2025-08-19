import React from 'react'
import {Routes,Route,Link,Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/Products'


const App = () => {
  return (
    <div>
      
     <BrowserRouter>
     <Routes>
 
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
</Routes>
</BrowserRouter>
      {/* <Home/>
      <Products/> */}
    </div>
  )
}

export default App
