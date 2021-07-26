import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import API from '../API';
import './styles/Admin.css'

const Admin = () => {

  const history = useHistory();
  var initialBook = {
    id: 0,
    title: "",
    author: "",
    isbn: "",
    price: 0,
  }
  const [book, setBook] = useState(initialBook);
  const [books, setBooks] = useState([]);
  const [action, setAction] = useState("add");

  useEffect(() => {
    getAllBooks();
  })

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
  const handleUpdate = (e) => {
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

  const handleUpdateAction = (b) => {
    setAction("update");
    setBook(b);
  }

  const handleDelete = (bookId) => {
    new API().deleteBook(bookId);
  }

  return (
    <div className="admin-page row">
    <table className="layout"> 
      <tr>
        <td className="left-col">
        <form className="form">
              <div class="container">
              {action === 'add' ? 
                <h1>Add a Book</h1> : <h1>Update Book</h1>
              }

                <p>Create a book by filling the details</p>
                <hr />

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
                  <button type="submit" class="addBookBtn" onClick={(e) => handleAdd(e)}>Add Book</button> :
                  <button type="submit" class="updateBookBtn" onClick={(e) => handleUpdate(e)}>Update Book</button>
                }

              </div>        
            </form>
        </td>
        <td className="right-col">
            <div className="panel">
              <h1>Admin Panel</h1>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b, i) => {
                    return (
                      <tr>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.isbn}</td>
                        <td>{b.price}</td>
                        <td>
                          <button className="edit-btn btn" onClick={() => handleUpdateAction(b)}>Update</button>
                          <button className="delete-btn btn" onClick={() => handleDelete(b.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                </table>
            </div>
        </td>
      </tr>
    </table>
            
    </div>
  );
}

export default Admin;
