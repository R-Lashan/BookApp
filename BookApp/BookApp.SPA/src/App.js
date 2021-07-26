import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Account from './components/Account';
import Admin from './components/Admin';
import Auth from './components/Auth';
import Cart from './components/Book';
import Book from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
          <Route path="/" exact component = {Home} />
          <Route path="/books" component = {Book} />
          <Route path="/cart" component = {Cart} />
          <Route path="/account" component = {Account} />
          <Route path="/register" component = {Register} />
          <Route path="/login" component = {Login} />
          <Route path="/admin" component = {Admin} />
      </Switch>
    </Router>
  );
}

export default App;
