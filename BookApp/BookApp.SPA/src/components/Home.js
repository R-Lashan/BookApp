import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContext';
import "./styles/Home.css";

const Home = () => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const signedInUser = storedUser !== null ? storedUser : appContext.emptyUser;
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
      <p className="text-3">Here is the Gateway to all the Knowledge to Unlock your fullest Potential as an Individual. You can read Most Popular and Best Selling Books written by World Class Authors. Please Register to Gain the Knowledge and Explore the World of Books with BookApp.</p>
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
      <span className="caption">Designed & Developed by Lashan @2021</span>
    </div>
  );
}

export default Home;
