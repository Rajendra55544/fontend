import React, { createContext, useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './Urls';
const refreshAccessToken = async () => {
    const headers = {
      headers: {
      'Content-Type': 'application/json'
      }
  }
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await axios.post('http://localhost:8000/token/refresh/', {refresh:refreshToken },headers);
      const accessToken  = response.data.access;
      // Update the access token in local storage
      localStorage.setItem('access_token', accessToken);
  
      return accessToken;
    } catch (error) {
      // console.error('Error refreshing access token:', error);
      // Handle error appropriately (e.g., redirect to login page)
      throw error;
    }
  };
  

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated,user]);
  
// this function getting api data 


const FetchData = async (endpoint) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        const response = await axios.get(`${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`,
          },
        })
        return response;
      }
      catch(err){
        throw err
      }
    } 
    else {
      throw error;
    }
  }
};

// end of this function endpont api data get


  const Login = (endpoint,username,password) => {
    
    // Perform login logic and set isAuthenticated to true if successful
    let login_url = BASE_URL+endpoint
    return new Promise((resolve, reject) => {
       axios.post(login_url, JSON.stringify({
        email: username,
        password: password
      }),{
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(({ data}) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token)
        setIsAuthenticated(true);
        setUser(data.user);
        resolve(data)
      }).catch(error => {
        reject(error);
      });
    });
    
      
  };

  const Logout = () => {
    // const navigate = useNavigate();
    // Perform logout logic and set isAuthenticated to false
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    setUser(null);
    setIsAuthenticated(false);
  return <Navigate to='/login' />
  };

  return (
    <AuthContext.Provider value={{ user,isAuthenticated, Login, Logout,FetchData }}>
      {children}
    </AuthContext.Provider>
  );
};
