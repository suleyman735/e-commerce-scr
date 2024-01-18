import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPass() {
    const { uidb64, token } = useParams();
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
          const response = await axios.post('http://your-django-api.com/reset-password/', {
            uidb64,
            token,
            new_password: newPassword,
          });
    
          // Handle success, e.g., show a success message or redirect to login page
        } catch (error) {
          // Handle error, e.g., display an error message
        }
      };
    
    
    
  return (
    <div>
    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
    <button onClick={handleResetPassword}>Reset Password</button>
  </div>
  )
}

export default ResetPass