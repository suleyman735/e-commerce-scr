import React, { useState } from 'react'
import mobile from './../assests/images/mobile.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate();
  const [error,setError]=useState(null)
  const [isLoading, setIsLoading] = useState(false);

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
      // console.log(refresh);
    // Store tokens in local storage or secure storage
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    console.log(response);

    if (response.status === 200) {
      setIsLoading(true)
      
    }
          // Hide spinner after 3 seconds
          // setIsLoading(false);
  
          // Redirect to a different page
          navigate('/');
      // Simulate API request or any asynchronous action
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 2000);
    

    //  navigate('/');
    } catch (error) {
      setError(error.response.data.detail || error.response.data.password)
  
      // Handle API error (e.g., display an error message)
 
      // console.error('Error logging in:', error.message);
    }
  };




  return (
    <div className='container-inline sign-form'>
    <div className="side-image">
        <img src={mobile} alt="" srcset="" />
    </div>
    <div className="form" >
    {isLoading && <div><ClipLoader/></div>}
    
        <div className="title">Login in to Exclusive</div>
        <div className="description">Enter your details below</div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="email">
        <input placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="password">
        <input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} type='password' required/>
        </div>
        <div className="button-login">
            <button onClick={handleLogin} className='login'>Login </button>
           <div className='forget-pasword'><a href='/forgot'>Forgot password</a></div>
          
        </div>
        
    
        


    </div>

</div>
  )
}

export default Login