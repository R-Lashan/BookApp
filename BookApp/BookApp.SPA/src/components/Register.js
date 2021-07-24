import React, { useEffect, useState } from 'react';
import './Register.css';
import API from '../API';
import { useHistory } from 'react-router';

const Register = () => {

  var initialUser = {
    name: "",
    email: "",
    type: 0,
    password: "",
  }
  const history = useHistory();
  const [user, setUser] = useState(initialUser);

  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    // checkFormValidation();
  })

  const checkFormValidation = () => {
    var isValid = false;
    var validProps = [];
    var allPropsCount = Object.keys(user).length - 1;
    for (let [key, value] of Object.entries(user)) {
      if(user[key] !== ""){
        validProps.push(key);
      }
    }
    
    isValid = isValid && allPropsCount === validProps.length ? true : false;

    setFormValid(isValid);
    console.log(isValid);
  }

  const handleSubmit = () => {
    console.log(user);
    new API().postUser(user).then(data => {
      console.log(data);
    });
    history.push('/books');
  }
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
    console.log(user);
    checkFormValidation();
  }

  return (
    <div className="register-page">
      <form>
        <div class="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="name"><b>Name</b></label>
          <input type="text" placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>

          <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={(e)=>handleChange(e)}/>

          <button disabled={!formValid} type="submit" class="registerbtn" onClick={() => handleSubmit()}>Register</button>

          <div class="signin">
            <p>Already have an account? <a href="./login">Sign in</a>.</p>
          </div>
        </div>        
      </form>
    </div>
  );
}

export default Register;
