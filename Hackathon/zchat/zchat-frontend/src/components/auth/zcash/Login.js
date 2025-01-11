import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import './Login.css'

const Login = () => {
  const [wallet, setWallet] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const zcash_address = localStorage.getItem('zcash_address');
    console.log(zcash_address);

    const response = await fetch('https://zchat-api.onrender.com/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: wallet,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      navigate('/messages'); // Redirect to another page after successful login
    } else {
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="desktop-12">
      <div className="screenshot-3151">
      </div>
      <div className="login">
        <h2 className="form-title">Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Wallet input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Username</label>
            <input
              type="text"
              id="form2Example2"
              className="form-control"
              name="wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              required 
              />
          </div>
        
          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example3">Password</label>
            <input
            type="password"
            id="form2Example3"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          </div>
        
          {/* Submit button */}
          <button id="btn-form" type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-block mb-4">Sign In</button>
        
          {/* Register buttons */}
          <div className="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
        
            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
      </div>
  );
};

export default Login;
