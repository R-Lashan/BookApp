import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the BookApp</h1>
      <button>
        <NavLink to="/register">Register now</NavLink>
      </button>
    </div>
  );
}

export default Home;
