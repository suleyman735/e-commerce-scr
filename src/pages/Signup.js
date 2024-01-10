import React,{useState} from 'react'
import './../assests/styles/signup.css'
import mobile from './../assests/images/mobile.png'

function Signup() {
  return (
    <div className='container-inline sign-form'>
        <div className="side-image">
            <img src={mobile} alt="" srcset="" />
        </div>
        <div className="form">
            <div className="title">Create an account</div>
            <div className="description">Enter your details below</div>
            <div className="name">
                <input  placeholder='name'/>
            </div>
            <div className="email">
            <input placeholder='email'/>
            </div>
            <div className="password">
            <input placeholder='password' type='password'/>
            </div>
            <div className="button-create">
              <a href=''>Create Account</a>  
            </div>
            <div className="button-google">Sign up with Google</div>
            <div className="login-pass">Already have account? <a href='/login'>Login</a></div>
            


        </div>

    </div>
  )
}

export default Signup