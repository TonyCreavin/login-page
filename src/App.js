import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login/Login';

function setTokenToSessionStorage(userToken) {
  sessionStorage.setItem('token', userToken.token);
}

function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setTokenToSessionStorage(token);
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <button
        onClick={() => {
          setToken('');
          setTokenToSessionStorage('');
        }}
      >
        logout
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/preferences" element={<Preferences />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
