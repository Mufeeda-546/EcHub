import React from 'react'

function SignUp() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSignup=async (e)=>{
    e.preventDefault()

    if(!name||!email||!password){
       alert('All fields required')
       return
    }else{
     try{
      (axios.post('http://localhost:3000/users'),{name,email,password})
    alert("successful")
  navigate("/login")}

  }catch(error){
    console.error(error)
    alert("something went wrong")
  }}
  return (
    <div>
        <h1>Create Account(Sign Up)</h1>
      <form  onSubmit={}>
      <input type="text" placeholder="Name" value={name}/>
      <input type="email" placeholder="Email" value={email}/>
      <input type="password" placeholder="Password" value={password}/>
      <input type="password" placeholder="Confirm password"/>
      <button onClick={}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
