import React,{useState} from 'react'
import './../assests/styles/signup.css'
import mobile from './../assests/images/mobile.png'

function Signup() {
  const [first_name,setFirst_Name]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: first_name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Successfully signed up
        console.log('User signed up successfully');
        // You may want to redirect the user to another page or show a success message
      } else {
        // Handle error cases
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to sign up',errorData);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className='container-inline sign-form'>
        <div className="side-image">
            <img src={mobile} alt="" srcset="" />
        </div>
        <div className="form">
            <div className="title">Create an account</div>
            <div className="description">Enter your details below</div>
            <div className="name">
                <input value={first_name} onChange={(e)=>setFirst_Name(e.target.value)} placeholder='name'/>
            </div>
            <div className="email">
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='email'/>
            </div>
            <div className="password">
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='password' type='password'/>
            </div>
            <div className="button-create">
              <a href='#' onClick={handleSignup}>Create Account</a>  
            </div>
            <div className="button-google">Sign up with Google</div>
            <div className="login-pass">Already have account? <a href='/login'>Login</a></div>
            


        </div>

    </div>
  )
}

export default Signup