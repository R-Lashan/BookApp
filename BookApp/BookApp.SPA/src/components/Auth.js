import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {

  var [authState, setAuthState] = useState('register');

  return (
    <div>
      {authState === "login" ? <Login /> : <Register />}
    </div>
  )
}

export default Auth;
