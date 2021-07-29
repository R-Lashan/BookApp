import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';

const NavBar = () => {

  const appContext = useContext(AppContext);
  const [itemsCount, setItemsCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setItemsCount(appContext.books.length);
  }, [appContext.books.length])

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
                    <td>
                      <span className="user-sign">Sign Up</span>
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
