import React,{useState} from 'react'
import './../assests/styles/editprofile.css'

function EditProfile() {

    // State to store user profile data
    const [userData, setUserData] = useState({
      first_name: '',
      email: '',
      // Add other profile fields as needed
    });




  return (
    <div className='container form-container'>
      <div className='label'>

      </div>

      <form>
        <div className='name'>
        <label htmlFor="">
        First Name
        <input type="text" placeholder='First Name' />
        </label>
        <label htmlFor="">
        Last Name
        <input type="text" placeholder='Last Name'/>
        </label>
        <label htmlFor="">
          Email
        <input type="text" />
        </label>
        </div>
<div className='password'>
        <label htmlFor="">
        Password Changes
        <input type="text" placeholder='Current Password' />
       
      
        <input type="text"  placeholder='New Password'/>
 
       
        <input type="text"  placeholder='Confirm Password'/>
      
       
        
        </label>
       
        </div>
       
      <div className='acc-buttons'>
        <div className='cancel'>Cancell</div>
        <div className='button'> Save Changes</div>
        </div>
       
        
      </form>
      

    </div>
  )
}

export default EditProfile