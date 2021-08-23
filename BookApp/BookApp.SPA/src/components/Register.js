import React, { useEffect, useState } from 'react';
import './styles/Register.css';
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

  var initialErrors = {
    name: "",
    email: "",
    password: ""
  };
  const [errors, setErrors] = useState(initialErrors);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    checkFormValidation();
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    new API().getUserForRegister(user.email).then(data => {
      if(data.status !== 200){
        manageRegister();
      }
      else {
        alert("Email already exists")
      } 
    })
    .catch(() => {});
  }
  
  const manageRegister = () => {
    var formIsValid = checkFormValidation(errors);
    if(formIsValid){
      new API().postUser(user).then(data => {
        setUser(initialUser);
        var signedUser = {
          id: data,
          name: user.name,
          email: user.email,
          type: user.type === 0 ? 'customer' : 'admin'
        }
        localStorage.setItem("user", JSON.stringify(signedUser))
        history.push('/books');
      });
    }
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
    checkInputValidation(e);
  }

  const checkInputValidation = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    var emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(value === ""){
      setErrors({ ...errors, [key]: `This field is required`});
    }
    else {
      setErrors({ ...errors, [key]: ""})
      if(key === "email"){
        setErrors({ ...errors, email: value.match(emailFormat) ? "" : "Invalid email format"});
      }
      else if(key === "password"){
        setErrors({ ...errors, password: value.length >= 8 ? "" : "Must have atleast 8 characters"});
      }
    }
  }

  const checkFormValidation = () => {
    var valid = 
      Object.values(errors).every(x => x === "") &&
      Object.values(user).every(x => x !== "");
    setFormValid(valid);
    return valid;
  }

  return (
    <div className="register-page">
      <h3 className="back-btn"  onClick={(e) => history.push('/')}>Back to Home</h3>
      <form>
        <div class="container">
          <h1>Register</h1>
          <p>Fill this form to create an account.</p>
          <hr />

          <label for="name"><b>Name</b></label>
          <span className="error">{errors.name}</span>
          <input type="text" className={errors.name !== "" ? "error-border" : ""} placeholder="Enter your name" name="name" id="name" required onChange={(e)=>handleChange(e)}/>

          <label for="email"><b>Email</b></label>
          <span className="error">{errors.email}</span>
          <input type="text" className={errors.email !== "" ? "error-border" : ""} placeholder="Enter Email" name="email" id="email" required onChange={(e)=>handleChange(e)}/>

          <label for="password"><b>Password</b></label>
          <span className="error">{errors.password}</span>
          <input type="password" className={errors.password !== "" ? "error-border" : ""} placeholder="Enter Password" name="password" id="password" required onChange={(e)=>handleChange(e)}/>

          <button disabled={!formValid} type="submit" class="registerbtn" onClick={(e) => handleSubmit(e)}>Register</button>

          <div class="signin">
            <p>Already have an account? <a href="./login">Sign in</a>.</p>
          </div>
        </div>        
      </form>
    </div>
  );
}

export default Register;
