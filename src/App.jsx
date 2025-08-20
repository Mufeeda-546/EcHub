import React from 'react'
import {Routes,Route,Link,Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/Products'
import SignUp from './pages/SignUp'
import Login from './pages/login'


const App = () => {
  return (
    <div>
      
     <BrowserRouter>
     <Routes>
 
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/login" element={<Login />} />
</Routes>
</BrowserRouter>
    
    </div>
  )
}

export default App
