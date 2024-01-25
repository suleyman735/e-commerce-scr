import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./../assests/styles/resetpass.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function ResetPass() {

  const navigate = useNavigate()
  // const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const { uidb64: paramUidb64, token: paramToken } = useParams();
  const [uidb64, setUidb64] = useState(paramUidb64 || ""); // Initialize with the URL parameter value
  const [token, setToken] = useState(paramToken || "");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Extracting query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const newToken = params.get("token");
    const newUidb64 = params.get("uidb64");

    // Update state if values have changed
    if (newToken !== token) {
      setToken(newToken || "");
    }

    if (newUidb64 !== uidb64) {
      setUidb64(newUidb64 || "");
    }
  }, [token, uidb64]);
  const handleResetPassword = async () => {
  
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/api/password-reset-complete/",
        {
          password: newPassword,
          token: token,
          uidb64: uidb64,
        }
      );
      setError(response.data.message);
    
      setIsLoading(true);

      // Simulate API request or any asynchronous action
      setTimeout(() => {
        // Hide spinner after 3 seconds
        setIsLoading(false);
  
        // Redirect to a different page
        navigate('/login');
      }, 3000);
      // Handle success, e.g., show a success message or redirect to login page
    } catch (error) {
      setError(error.message);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="resetPass container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="password"
        className="inp"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="button" onClick={handleResetPassword}>
        Reset Password
      </button>
      {isLoading && <div><ClipLoader/></div>}
    </div>
  );
}

export default ResetPass;
