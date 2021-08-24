import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './styles/Login.css';
import API from '../API';
import { AppContext } from '../AppContext';

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
  const appContext = useContext(AppContext);

  var initialErrors = {
    email: "",
    password: ""
  };
  const [errors, setErrors] = useState(initialErrors);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setUserData(initialUserData);
  }, [])

  useEffect(() => {
    checkFormValidation();
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    new API().getUser(userData.email).then(data => {
      setUser(data);
      manageLogin(data);
    })
    .catch(() => {
      alert("Invalid user email or password");
    });
  }
  
  const manageLogin = (data) => {
    var userIsValid = checkUserValidation(data);
    var formIsValid = checkFormValidation(errors);
  
    if(userIsValid){
      if(formIsValid){
        var signedUser = {
          id: data.id,
          name: data.name,
          email: data.email,
          type: data.type === 0 ? 'customer' : 'admin'
        }
        localStorage.setItem("user", JSON.stringify(signedUser))
        appContext.addUser(user)
        if(signedUser.type === 'customer'){
          history.push('/books');
          appContext.removeAllBooks();
        } 
        else{
          history.push('/admin');
          appContext.removeAllBooks();
        }        
      }
    }  
    else {
      alert("Invalid user email or password");
    }
  }

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
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

  const checkUserValidation = (user) => {
    var userExist = (user.email === userData.email && user.password === userData.password);
    return userExist;
  }

  const checkFormValidation = () => {
    var valid = 
      Object.values(errors).every(x => x === "") &&
      Object.values(userData).every(x => x !== "");
    setFormValid(valid);
    return valid;
  }

  return (
    <div className="login-page">
      <h3 className="back-btn" onClick={(e) => history.push('/')}>Back to Home</h3>
      <form>
        <div class="container">
          <h1>Login</h1>
          <p>Fill this form & login to your account.</p>
          <hr />

          <label for="email"><b>Email</b></label>
          <span className="error">{errors.email}</span>
          <input type="text" className={errors.email !== "" ? "error-border" : ""} placeholder="Enter Email" name="email" id="email" onChange={(e)=>handleChange(e)} required />

          <label for="password"><b>Password</b></label>
          <span className="error">{errors.password}</span>
          <input type="password" className={errors.password !== "" ? "error-border" : ""} placeholder="Enter Password" name="password" id="psw" onChange={(e)=>handleChange(e)} required />

          <p className="note">To login as admin: (for testing purpose)<br /> Email - <strong>admin@gmail.com</strong>,  Password - <strong>admin123</strong></p>
          
          <button disabled={!formValid} type="submit" className="loginbtn" onClick={(e) => handleSubmit(e)}>Login</button>
          
          <div class="container signup">
            <p>Do not have an account? <a href="./register">Sign up</a>.</p>
          </div>
        </div>       
      </form>
    </div>
  );
}

export default Login;
