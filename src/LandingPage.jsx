import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const [authURL, setAuthURL] = useState('');

    const Login = async() =>{
        try {
            const response = await axios.post('http://localhost:8000/nylas/generate-auth-url');
            const authURLFromNylas = response.data;
        
            setAuthURL(authURLFromNylas);
      
            window.location.href = authURLFromNylas;
          } catch (error) {
            console.error('Error fetching auth URL:', error);
          }
    }
  return (
    <div>
       <p> LandingPage</p>
    <button onClick={Login}>Login here</button>   
    </div>
  )
}

export default LandingPage