import React,{useState} from 'react'
import './../assests/styles/signup.css'
import mobile from './../assests/images/mobile.png'
import { useNavigate } from 'react-router-dom';


function Signup() {

  const [first_name,setFirst_Name]=useState('')
  const [last_name,setLast_Name]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)

  const navigate = useNavigate();

  const handleSignup = async (e) => {
   
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name:last_name,
          email: email,
          password: password,
        }),
      });

      // console.log(response.body);

      if (!response.ok) {
        const errorData = await response.json();
        // console.error('Error response from server:', errorData.errors.email);
        setError(errorData.errors.email);
        throw new Error(`Server error: ${errorData.detail || errorData.message}`);// Adjust this based on the actual error structure
      }
      navigate('/verified')
  

    } catch (error) {
      // console.error('Registration failed:', error);

    }


  };

  return (
    <div className='container-inline sign-form'>
        <div className="side-image">
            <img src={mobile} alt="" srcset="" />
        </div>
        
        <div className="form">
          
<form onSubmit={handleSignup}>
            <div className="title">Create an account</div>
            <div className="description">Enter your details below</div>
            <div className="name">
                <input value={first_name} onChange={(e)=>setFirst_Name(e.target.value)} placeholder='First Name' required/>
            </div>
            <div className="name">
                <input value={last_name} onChange={(e)=>setLast_Name(e.target.value)} placeholder='Last Name' required/>
            </div>
            <div className="email">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='email'/>
            </div>
            <div className="password">
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='password' type='password' required/>
            </div>
            <div className="button-create">
            <button type='submit'>Create Account</button> 
            </div>
            <div className="button-google">
              Sign up with Google</div>
            <div className="login-pass">Already have account? <a href='/login'>Login</a></div>
            
 </form>

        </div>
       

    </div>
  )
}

export default Signup