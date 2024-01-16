import { createContext, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();


  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access"))
  );

  const login = () => {
    localStorage.setItem("access");
    localStorage.setItem("refresh");

    setIsAuthenticated(true);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    const response = await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {
          refresh: refreshToken,
        }
      );
      console.log(response.data);



    // Clear tokens from local storage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);

    
  };

  const expiredToken = async () => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      console.log(currentTimestamp);
      if (decodedToken.exp < currentTimestamp) {
        console.log("Access token has expired");

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        var access = response.data.access;
        localStorage.setItem("access", access);

        console.log(response.data.access);
        console.log("Access token has been refreshed:", access);
      } else {
        console.log("Access token is valid");
      }

      // console.log(decodedToken);
    }
  };

  useEffect(() => {
    expiredToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
