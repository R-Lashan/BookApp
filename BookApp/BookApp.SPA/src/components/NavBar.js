import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';

const NavBar = () => {

  const appContext = useContext(AppContext);
  const [itemsCount, setItemsCount] = useState(0);
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const signedInUser = storedUser !== null ? storedUser : appContext.emptyUser;
  const [signedUser, setSignedUser] = useState(signedInUser);
  const location = useLocation();

  useEffect(() => {
    setItemsCount(appContext.books.length);
  }, [appContext.books.length])

  useEffect(() => {
    setSignedUser(signedInUser);
  }, [signedInUser.id]);

  const handleLogout = () => {
    var emptyUser = {
      name: "",
      email: "",
      type: ""
    };
    localStorage.setItem("user", JSON.stringify(emptyUser));
    setSignedUser(emptyUser);
    appContext.removeAllBooks();
    history.push('/login');
  }

  return (
    <div>
      {
        location.pathname !== "/register" && location.pathname !== "/login" ?
          <div class="topnav">      
              <div className="nav-topbar">
                <table>
                  <tr>
                    <td>
                      <NavLink className="logo" to="/">
                        <h1 className="main-text">BookApp</h1>
                      </NavLink>
                    </td>
                    <td className="sign-section">
                      {
                        signedUser.type === "" || signedInUser == null
                          ? 
                          <span className="signin-btn" onClick={() => history.push('/login')}>Sign in</span>
                          : 
                          <span className="user-sign">
                            <span className="user-name">{signedUser.name}</span>
                            <span className="logout-btn" onClick={() => handleLogout()}>Logout</span>
                          </span>
                      }   
                    </td>
                  </tr>
                </table>
              </div>
            
            <div className="navlinks">
              <table>
                <tr>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/" exact>Home</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/books">Books</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/cart">Cart
                      {itemsCount > 0 ? <span className="cart-count">{itemsCount}</span> : ""}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/account">Account</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/admin">Admin</NavLink>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          :
          ""
      }
    </div>
  );
}

export default NavBar;
