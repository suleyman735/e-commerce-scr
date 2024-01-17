import React,{useEffect, useState} from 'react'
import './../assests/styles/editprofile.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

function EditProfile() {
      // State to store user profile data
      const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        old_password:'',
        new_password:'',
        email: '',
        // Add other profile fields as needed
      });
      const [error, setError] = useState(null);

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


   // Handler for form submission
   const handleFormSubmit = async (e) => {
    e.preventDefault();

    const BearerToken = localStorage.getItem("access");
    const API = 'http://127.0.0.1:8000/api/user-profile/';

    const config = {
      headers: {
        'Authorization': `Bearer ${BearerToken}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      // Send updated user profile data to the API for saving
      await axios.put(API, userData, config);  // Replace with your API endpoint

      setError('Profile updated successfully!')

    } catch (error) {

      if(error.response){

        setError(error.response.data.message);

      }else if(error.request){
        setError('No response from the server');
        console.error('No Response Received:', error.request);
      }else{
                // Something happened in setting up the request that triggered an Error
                setError('Error setting up the request');
                console.error('Request Setup Error:', error.message);
      }
      console.error('Error updating user profile:', error);
    }
  };


  useEffect(()=>{
    getUserData()
  },[])





console.log(userData.first_name);


  return (
    <div className='container form-container'>
      <div className='label'>
      <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Your other UI components */}
    </div>
      </div>

      <form>
        <div className='name'>
        <label htmlFor="">
        First Name
        <input type="text" name="first_name" value={userData.first_name} onChange={handleInputChange}  className='inp' placeholder='First Name' />
        </label>
        <label htmlFor="">
        Last Name
        <input type="text" name="last_name" value={userData.last_name} onChange={handleInputChange}  className='inp' placeholder='Last Name'/>
        </label>
        <label htmlFor="">
          Email
        <input type="text"  name="email" value={userData.email} onChange={handleInputChange} className='inp' disabled/>
        </label>
        </div>
<div className='password'>
        <label htmlFor="">
        Password Changes
        <input type="text" name='old_password' value={userData.old_password} onChange={handleInputChange} className='inp' placeholder='Current Password' required/>
       
      
        <input type="text" name='new_password'  value={userData.new_password} onChange={handleInputChange} className='inp'  placeholder='New Password' required/>
 
      
       
        
        </label>
       
        </div>
       
      <div className='acc-buttons'>
        <div className='cancel'> <Link to="/">Cancell</Link></div>
        <div className='button' onClick={handleFormSubmit}>Save Changes</div>
        </div>
       
        
      </form>
      

    </div>
  )
}

export default EditProfile