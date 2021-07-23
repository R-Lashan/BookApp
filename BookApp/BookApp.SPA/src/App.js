import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
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
          <Route path="/register" component = {Register} />
          <Route path="/login" component = {Login} />
      </Switch>
    </Router>
  );
}

export default App;
