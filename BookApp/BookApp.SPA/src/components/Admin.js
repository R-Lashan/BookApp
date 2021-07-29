import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import API from '../API';
import './styles/Admin.css'

const Admin = () => {

  var initialBook = {
    id: 0,
    title: "",
    author: "",
    isbn: "",
    price: 0,
  }
  const history = useHistory();
  const [book, setBook] = useState(initialBook);
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState("add");
  const signedInUser = JSON.parse(localStorage.getItem("user"));
  const [signedUser, setSignedUser]= useState(signedInUser);

  useEffect(() => {
    getAllBooks();
  })

  useEffect(() => {
    setSignedUser(signedInUser);
  }, [signedInUser.type]);

  const getAllBooks = () => {
    new API().getAllBooks().then(data => {
      setBooks([...data]);
    });
  }
  const handleAdd = (e) => {
    e.preventDefault();
    new API().addBook(book).then(data => {
      setBook(initialBook);
    });
  }
  const handleEdit = (e) => {
    e.preventDefault();
    new API().updateBook(book).then(data => {
      setBook(initialBook);
    });
    setAction("add");
}
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    if(e.target.type === "number"){
      value = parseFloat(e.target.value);
    }
    setBook({...book, [name]: value});
  }

  const handleEditAction = (b) => {
    setAction("edit");
    setBook(b);
  }

  const handleDelete = (bookId) => {
    new API().deleteBook(bookId);
  }

  var body;
  if(signedUser.type === "admin"){
    body =
    <table className="layout">
      <tr>
        <td className="left-col">
        <form className="form">
              <div class="container">
              {action === 'add' ? 
                <h1>Add a Book</h1> : <h1>Edit Book</h1>
              }
                <label for="name"><b>Title</b></label>
                <input type="text" placeholder="Title" name="title" id="title" value={book.title} required onChange={(e)=>handleChange(e)}/>

                <label for="author"><b>Author</b></label>
                <input type="text" placeholder="Author" name="author" id="author" value={book.author} required onChange={(e)=>handleChange(e)}/>

                <label for="isbn"><b>ISBN</b></label>
                <input type="text" placeholder="ISBN number" name="isbn" id="isbn" value={book.isbn} required onChange={(e)=>handleChange(e)}/>
                
                <label for="price"><b>Price</b></label>
                <input type="number" placeholder="Price" name="price" id="price" value={book.price} required onChange={(e)=>handleChange(e)}/>
                <br></br>

                {action === 'add' ? 
                  <button type="submit" class="addBookBtn" onClick={(e) => handleAdd(e)}>Add</button> :
                  <button type="submit" class="editBookBtn" onClick={(e) => handleEdit(e)}>Save</button>
                }

              </div>        
            </form>
        </td>
        <td className="right-col">
            <div className="panel">
              <h1>Admin Panel</h1>
              {
                books.length > 0 ?
                  <table>
                    <div className="table-head">
                      <tr className="th-row">
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </div>
                    <div className="table-body">
                      {books.map((b, i) => {
                        return (
                          <tr className="td-row">
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.isbn}</td>
                            <td>{b.price}</td>
                            <td>
                              <button className="edit-btn btn" onClick={() => handleEditAction(b)}>Edit</button>
                              <button className="delete-btn btn" onClick={() => handleDelete(b.id)}>Delete</button>
                            </td>
                          </tr>
                        )
                      })}
                    </div>
                    </table> 
                    :
                    <div className="admin-table-message-box">
                      <h1>Bookshelf is empty :(</h1>
                      <h3>Add some Books to show.</h3>
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
      <h3>Please Sign in as Admin to View your Account.</h3>
      <button onClick={() => history.push('/login')}>Sign in as Admin</button>
    </div>
  }

  return (
    <div className="admin-page row">
      {body}        
    </div>
  );
}

export default Admin;
