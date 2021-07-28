import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Account from './components/Account';
import Admin from './components/Admin';
import Cart from './components/Cart';
import Books from './components/Books';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import { AppContextProvider } from './AppContext';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <NavBar />
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/books" component = {Books} />
            <Route path="/cart" component = {Cart} />
            <Route path="/account" component = {Account} />
            <Route path="/register" component = {Register} />
            <Route path="/login" component = {Login} />
            <Route path="/admin" component = {Admin} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
