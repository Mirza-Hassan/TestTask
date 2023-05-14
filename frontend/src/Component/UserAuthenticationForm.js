import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import bcrypt from 'bcryptjs';

const UserAuthenticationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send authentication data to the backend API
    // Implement the API call using Axios or Fetch
    try {
      const response = await axios.get('http://localhost:8000/api/signup');

      const matchedUser = response.data.data.find(user => user.email === email);
      if (matchedUser) {
        bcrypt.compare(password, matchedUser.password, function (err, result) {
          if (result) {
            console.log('Password matches!');
            // Redirect to the article page
            navigate('/article');
          } else {
            console.log('Password does not match!');
            // Handle the case when the password doesn't match
            setMessage('Incorrect password, please try again');
          }
        });
      } else {
        console.log('Email does not exist!');
        // Handle the case when the email doesn't match
        setMessage('Email does not exist, proceed with signup');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <>
        <section class="sign-in">
          <div class="container">
            <div class="signin-content">
              <div class="signin-image">
                <img src="images/signin-image.jpg" alt="sign in image"/>
                <Link to="/register">Create an account</Link>
              </div>

              <div class="signin-form">
                <h2 class="form-title">Sign In</h2>
                <form method="POST" class="register-form">
                  <div class="form-group">
                    <label for="your_email"><i class="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="your_email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div class="form-group">
                    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                    <input type="password" name="your_pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>

                  <div class="form-group form-button">
                    <button type="submit" name="signin" class="form-submit" onClick={handleSubmit}>
                      Login
                    </button>
                  </div>
                </form>
                {message && <p>{message}</p>}
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default UserAuthenticationForm;
