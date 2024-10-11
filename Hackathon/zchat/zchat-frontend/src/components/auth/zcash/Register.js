import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import './Register.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://zchat-api.onrender.com/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // alert(data.zcash_address)
      localStorage.setItem('zcash_address', data.zcash_address);
      navigate('/login'); // Redirect to another page after successful login
    } else {
        console.log(response)
      alert('Failed to Register. Zcash is temporarily unavailable.');
    }
  };

  return (
    <div className="desktop-12">
      <div className="screenshot-3151">
      </div>
      <div className="login">
        <h2 className="form-title">Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">Email address</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            requiredid="form2Example1"
            className="form-control"
             />
          </div>
        
          {/* Username input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Username</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            id="form2Example2"
            className="form-control"
             />
          </div>
        
          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example3">Password</label>
            <input 
            type="password"
            id="form2Example3"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
          </div>
        
          {/* Submit button */}
          <button id="btn-form" type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-block mb-4">Sign Up</button>
        
          {/* Register buttons */}
          <div className="text-center">
            <p>Already a member? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
      </div>
  );
};

export default Register;
