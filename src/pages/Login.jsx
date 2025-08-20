import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


function Login() {
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const navigate=useNavigate()
const handleSubmit=async (e)=>{
 e.preventDefault()
 if(!name||!password){
  alert("All fields required")
  return
 }
 try{const result=await axios.get('http://localhost:3000/users')
  const getItem=result.data

  const check=getItem.find((users)=>users.name===name&&users.password===password)
  if(check){
  alert ("successful")
  // localStorage.setItem("authToken",check.token)
  // localStorage.setItem("name",check.name)
  //  console.log(localStorage.getItem("authToken")); 
  // console.log(localStorage.getItem("name"));  
 navigate("/")
  }else{
    alert("something went wrong")
  }
 }
 catch(error){console.error(error)}
}
  return (
    <div className="text-center">
  <div className="flex flex-col justify-content items-center mt-64 p-20 border inline-block rounded">
      <h1 className="text-4xl mb-3 font-bold">Log In</h1>
      <form  onSubmit={handleSubmit}>
      <input className="border w-64 rounded mb-3 p-2" type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name}/><br/>
      <input className="border w-64 rounded mb-3 p-2"type="password" placeholder="Password"onChange={(e)=>setPassword(e.target.value)}value={password}/><br/>
      <button className="border w-64 rounded mb-3 p-2" >Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Login
