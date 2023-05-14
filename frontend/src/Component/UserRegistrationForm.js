import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send registration data to the backend API
    // Implement the API call using Axios or Fetch
    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        username,
        email,
        password,
      });
      // Handle the response data
      console.log(response.data);
      navigate('/');
      // Redirect or perform additional actions upon successful signup
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
      setMessage('Please fill out all required fields.');
    }
  };

  return (
    <>
      <section class="signup">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form">
                <div class="form-group">
                  <label for="username"><i class="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="username" placeholder="Your User Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="email"><i class="zmdi zmdi-email"></i></label>
                  <input type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="form-group form-button">
                  <button type="submit" name="signup" class="form-submit" onClick={handleSubmit}>Register
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
            <div class="signup-image">
              <img src="images/signup-image.jpg" alt="sign up image" />
              <a class="signup-image-link"> <Link to="/">I am already Login</Link></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegistrationForm;
