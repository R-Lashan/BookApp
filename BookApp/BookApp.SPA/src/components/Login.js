import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <form>
        <div class="container">
          <h1>Login</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" id="psw" required />

          <button type="submit" class="loginbtn">Login</button>
          
          <div class="container signup">
            <p>Do not have an account? <a href="./register">Sign up</a>.</p>
          </div>
        </div>       
      </form>
    </div>
  );
}

export default Login;
