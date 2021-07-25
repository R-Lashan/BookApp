import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './styles/Login.css';
import API from '../API';

const Login = () => {
  const history = useHistory();
  var initialUserData = {
    email: "",
    password: "",
  }
  var initialUser = {
    id: 0,
    name: "",
    email: "",
    type: 0,
    password: "",
  }
  const [userData, setUserData] = useState(initialUserData);
  const [user, setUser] = useState(initialUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    new API().getUser(userData.email).then(data => {
      setUser(data);
      var userIsValid = checkLoginValidation(data);
      console.log(userIsValid)
      if(userIsValid){
        history.push('/books');
      }
    });
  }

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const checkLoginValidation = (user) => {
    console.log(user, userData);
    return (user.email === userData.email && user.password === userData.password);
  }

  return (
    <div className="login-page">
      <form>
        <div class="container">
          <h1>Login</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" onChange={(e)=>handleChange(e)} required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="psw" onChange={(e)=>handleChange(e)} required />

          <button type="submit" class="loginbtn" onClick={(e) => handleSubmit(e)}>Login</button>
          
          <div class="container signup">
            <p>Do not have an account? <a href="./register">Sign up</a>.</p>
          </div>
        </div>       
      </form>
    </div>
  );
}

export default Login;
