import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../AppContext';

const Account = () => {

  const history = useHistory();
  const appContext = useContext(AppContext);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const signedInUser = storedUser !== null ? storedUser : appContext.emptyUser;
  const [signedUser, setSignedUser]= useState(signedInUser);

  useEffect(() => {
    setSignedUser(signedInUser);
  }, [signedInUser.type]);

  var body;
  if(signedUser.type === "customer"){
    body = ""
  }
  else {
    body = 
    <div className="message-box">
      <h1>You aren't signed in :(</h1>
      <h3>Please Sign in as Customer to View your Account.</h3>
      <button onClick={() => history.push('/login')}>Sign in as User</button>
    </div>
  }

  return (
    <div className="account-page">
      {body}
    </div>
  );
}

export default Account;
