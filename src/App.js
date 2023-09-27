import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNylas } from '@nylas/nylas-react';
import NylasLogin from './NylasLogin';
import LoginDone from './LoginDone';
import LandingPage from "./LandingPage";

function App() {
  const nylas = useNylas();
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const SERVER_URI = 'http://localhost:8000';

  useEffect(() => {
    if (!nylas) {
      return;
    }

    // Handle the code that is passed in the query params from Nylas after a successful login
    const params = new URLSearchParams(window.location.search);
    if (params.has('code')) {
      console.log(params);
      nylas
        .exchangeCodeFromUrlForToken()
        .then((user) => {
          console.log("user",user);
          const { id, emailAddress } = JSON.parse(user);
          setUserId(id);
          sessionStorage.setItem('userId', id);
          sessionStorage.setItem('userEmail',emailAddress);
        })
        .catch((error) => {
          console.error('An error occurred parsing the response:', error);
        });
    }
  }, [nylas]);

  useEffect(() => {
    const userIdString = sessionStorage.getItem('userId');
    const userEmail = sessionStorage.getItem('userEmail');
    if (userIdString) {
      setUserId(userIdString);
    }
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    if (userId?.length) {
      window.history.replaceState({}, '', `/?userId=${userId}`);
      getEmails();
    } else {
      window.history.replaceState({}, '', '/');
    }
  }, [userId]);

  const getEmails = async () => {
    setIsLoading(true);
    try {
      const url = SERVER_URI + '/nylas/read-emails';
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: userId,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEmails(data);
      } else {
        setEmails([]);
      }
    } catch (e) {
      console.warn(`Error retrieving emails:`, e);
      return false;
    }
    setIsLoading(false);
  };


  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<LoginDone />} />
        <Route path="/login" element={<NylasLogin />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>

      </>
  );
}

export default App;