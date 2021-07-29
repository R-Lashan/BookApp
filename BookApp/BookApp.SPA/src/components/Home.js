import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./styles/Home.css";

const Home = () => {
  const history = useHistory();
  const signedInUser = JSON.parse(localStorage.getItem("user"));
  const [signedUser, setSignedUser] = useState(signedInUser);

  useEffect(() => {
    setSignedUser(signedInUser);
  }, [signedInUser.type]);

  var body;
  if(signedUser.type === "admin"){
    body = 
    <div>
      <h2 className="text-1">Hi {signedUser.name} :)</h2>
      <h1 className="text-2">Welcome to the BookApp</h1>
      <button className="btn books-btn" onClick={() => history.push('/admin')}>
        Go to Control Panel
      </button>
      <p>Or</p>
      <button className="btn signin-btn" onClick={() => history.push('/login')}>
        Sign in as Customer
      </button>
    </div>
  }
  else if(signedUser.type === "customer"){
    body =
    <div>
      <h2 className="text-1">Hi {signedUser.name} :)</h2>
      <h1 className="text-2">Welcome to the BookApp</h1>
      <button className="btn books-btn" onClick={() => history.push('/books')}>
        Explore Books
      </button>
      <p>Or</p>
      <button className="btn signin-btn" onClick={() => history.push('/login')}>
        Sign in as Admin
      </button>
    </div>
  }
  else {
    body = 
    <div>
      <h1 className="text-2">Welcome to the BookApp</h1>
      <button className="btn signup-btn" onClick={() => history.push('/register')}>
        Register now
      </button>
    </div>
  }

  return (
    <div className="home-page">
      <div className="banner">
        {body}
      </div>
    </div>
  );
}

export default Home;
