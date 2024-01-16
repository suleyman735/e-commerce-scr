import React,{useEffect, useState} from 'react'
import './../assests/styles/editprofile.css'
import axios from 'axios'

function EditProfile() {
      // State to store user profile data
      const [userData, setUserData] = useState({
        first_name: '',
        email: '',
        // Add other profile fields as needed
      });

  const getUserData =()=>{
    const BearerToken = localStorage.getItem("access");
    const API = 'http://127.0.0.1:8000/api/user-profile/';

    // Make a GET request with Bearer token
axios.get(API, {
  headers: {
    'Authorization': `Bearer ${BearerToken}`,
    'Content-Type': 'application/json',  // Adjust content type if needed
  },
})
  .then(response => {
    setUserData(response.data)

    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  }

    // Handler for input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };


  useEffect(()=>{
    getUserData()
  },[])





console.log(userData.first_name);


  return (
    <div className='container form-container'>
      <div className='label'>

      </div>

      <form>
        <div className='name'>
        <label htmlFor="">
        First Name
        <input type="text" value={userData.first_name} onChange={handleInputChange}  className='inp' placeholder='First Name' />
        </label>
        <label htmlFor="">
        Last Name
        <input type="text" value={userData.last_name} onChange={handleInputChange}  className='inp' placeholder='Last Name'/>
        </label>
        <label htmlFor="">
          Email
        <input type="text"  name="email" value={userData.email} onChange={handleInputChange} className='inp'/>
        </label>
        </div>
<div className='password'>
        <label htmlFor="">
        Password Changes
        <input type="text" className='inp' placeholder='Current Password' />
       
      
        <input type="text" className='inp'  placeholder='New Password'/>
 
       
        <input type="text" className='inp'  placeholder='Confirm Password'/>
      
       
        
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