import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../AppContext';
import API from '../API';
import "./styles/Account.css";

const Account = () => {

  var initialUser = {
    id: 0,
    name: "",
    email: "",
    type: 0,
    password: "",
  }
  const history = useHistory();
  const appContext = useContext(AppContext);
  const [user, setUser] = useState(initialUser);
  const [invoices, setInvoices] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const signedInUser = storedUser !== null ? storedUser : appContext.emptyUser;
  const [signedUser, setSignedUser]= useState(signedInUser);

  useEffect(() => {
    if(storedUser.email !== ""){
      getAllInvoices(signedUser.id);
    }
  }, [storedUser]);

  useEffect(() => {
    setSignedUser(signedInUser);
    getUser(signedUser.email)
  }, [signedInUser.Id]);

  const getAllInvoices = (userId) => {
    new API().getInvoicesByUserId(userId).then(data => {
      console.log(data)
      setInvoices([...data]);
    });
  }

  const getUser = (email) => {
    new API().getUser(email).then(data => {
      setUser(data);
    });
  }

  const handleEdit = (e) => {
    e.preventDefault();
    new API().updateUser(user).then(data => {
      setUser(user);
      var signedUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        type: data.type === 0 ? 'customer' : 'admin'
      }
      localStorage.setItem("user", JSON.stringify(signedUser))
    });
  }
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setUser({...user, [name]: value});
  }

  const handleDelete = (userId) => {
    if(window.confirm("Are you sure you want to DELETE your Account?")){
      new API().deleteUser(userId);
      handleLogout();
    }
  }

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

  var body;
  if(signedUser.type === "customer"){
    body =
    <table className="layout">
      <tr>
        <td className="left-col">
        <form className="form">
              <div class="container">

              <h1>Edit User</h1>

                <label for="name"><b>Name</b></label>
                <input type="text" placeholder="Name" name="name" id="name" value={user.name} required onChange={(e)=>handleChange(e)}/>

                <label for="author"><b>Email</b></label>
                <input type="text" placeholder="Email" name="email" id="email" value={user.email} required onChange={(e)=>handleChange(e)}/>
                
                <label for="price"><b>Password</b></label>
                <input type="text" placeholder="Password" name="password" id="password" value={user.password} required onChange={(e)=>handleChange(e)}/>
                <br></br>

                <span>
                <button type="submit" className="edit-btn btn" onClick={(e) => handleEdit(e)}>Save</button>
                </span>
                <span>
                <button type="submit" className="delete-btn btn" onClick={() => handleDelete(user.id)}>Delete Account</button>
                </span>

              </div>        
            </form>
        </td>
        <td className="right-col">
            <div className="panel">
              <h1>Purchase History</h1>
              {
                invoices.length > 0 ?
                  <table>
                    <div className="table-head">
                      <tr className="th-row">
                        <th>Invoice Id</th>
                        <th>No of Books</th>
                        <th>Total Price</th>
                        <th>Date</th>
                      </tr>
                    </div>
                    <div className="table-body">
                      {invoices.map((b, i) => {
                        return (
                          <tr className="td-row">
                            <td>{b.id}</td>
                            <td>{b.bookInvoices.length}</td>
                            <td>${b.totalPrice}</td>
                            <td>{new Date(Date.parse(b.created)).toDateString()}</td>
                          </tr>
                        )
                      })}
                    </div>
                    </table> 
                    :
                    <div className="account-message-box">
                      <h1>History is empty :(</h1>
                      <h3>Purchase some Books to show purchase history.</h3>
                    </div>
                  }
            </div>
        </td>
      </tr>
    </table>
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
