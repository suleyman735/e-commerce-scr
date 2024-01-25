import React,{useState} from 'react';
import './../assests/styles/forgotpass.css'
import axios from 'axios'

function ForgotPass() {
  const [email,setEmail]=useState('')
  const [error,setError] = useState(null)

  const handleResetEmail = async (e) => {
    e.preventDefault()
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/request-reset-email/', {
        email: email,
      
      });

if (response.status===200) {
  setError(response.data.success)
  
}
      



    //  navigate('/');
    } catch (error) {
      setError(error.response.data.error)
      

    }
  };






  return (

    <div className='forgotPass container'>
      <div className="forgotPassContainer">
        <form onSubmit={handleResetEmail}>

        <div className="title">Forgot your password</div>
        <div className="dscription">
          Please enter your email address you would like your password reset information sent to
        </div>
        <label> Enter Email Address</label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" className='' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <button type='submit' className='button'>Request Reset Link</button>
        </form>
        <button className='button'>Back to Login</button>
      </div>

    </div>
    
  )
}

export default ForgotPass