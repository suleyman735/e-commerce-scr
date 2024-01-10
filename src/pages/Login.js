import React from 'react'
import mobile from './../assests/images/mobile.png'

function Login() {
  return (
    <div className='container-inline sign-form'>
    <div className="side-image">
        <img src={mobile} alt="" srcset="" />
    </div>
    <div className="form">
        <div className="title">Login in to Exclusive</div>
        <div className="description">Enter your details below</div>

        <div className="email">
        <input placeholder='email'/>
        </div>
        <div className="password">
        <input placeholder='password' type='password'/>
        </div>
        <div className="button-login">
            <div className='login'><a href=''>Login</a> </div>
           <div className='forget-pasword'><a href=''>Forgot password</a></div>
          
        </div>

        


    </div>

</div>
  )
}

export default Login