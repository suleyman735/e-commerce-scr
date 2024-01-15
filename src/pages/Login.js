import React, { useState } from 'react'
import mobile from './../assests/images/mobile.png'
import axios from 'axios';


function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleLogin = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email,
        password: password,
      });
      var tokensString = response.data.tokens
      var tokens = JSON.parse(tokensString.replace(/'/g, '"'));
      const { refresh, access } = tokens;
      console.log(refresh);
    // Store tokens in local storage or secure storage
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

     
    } catch (error) {
      // Handle API error (e.g., display an error message)
      console.error('Error logging in:', error);
    }
  };




  return (
    <div className='container-inline sign-form'>
    <div className="side-image">
        <img src={mobile} alt="" srcset="" />
    </div>
    <div className="form">
        <div className="title">Login in to Exclusive</div>
        <div className="description">Enter your details below</div>

        <div className="email">
        <input placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="password">
        <input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/>
        </div>
        <div className="button-login">
            <div className='login' onClick={handleLogin}><a href=''>Login</a> </div>
           <div className='forget-pasword'><a href=''>Forgot password</a></div>
          
        </div>

        


    </div>

</div>
  )
}

export default Login