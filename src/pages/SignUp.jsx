import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignUp() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const navigate=useNavigate()

  const handleSignup=async (e)=>{
    e.preventDefault()

    if(!name||!email||!password||!confirmPassword){
       alert('All fields required')
       return
    }
      if(confirmPassword !==password){
        return alert("Password do not match")
      }
    
      try{
      await axios.post('http://localhost:3000/users',{name,email,password})
    alert("successful")
  navigate("/login")}

  catch(error){
    console.error(error)
    alert("something went wrong")
  }}
  return (
    <div className="flex flex-col justify-center items-center">
      <div  className=" flex flex-col justify-center mt-24 border  rounded  ">
        <h1 className="text-3xl ">Create Account(Sign Up)</h1><br/>
      <form className="text-center" onSubmit={handleSignup}>
      <input  className="border rounded w-84 p-2 mb-2" type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name}/><br/>
      <input className="border rounded w-84 p-2 mb-2" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/><br/>
      <input className="border rounded w-84 p-2 mb-2" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/><br/>
      <input className="border rounded w-84 p-2 mb-2" type="password" placeholder="Confirm password" onChange={(e)=>setConfirmPassword(e.target.value)}  value={confirmPassword}/><br/>
      <button className="border rounded w-84 p-2 mb-2" >Submit</button>
      </form>
      </div>
    </div>
  )
}

export default SignUp
