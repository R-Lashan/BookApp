import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import API from '../API';
import { AppContext } from '../AppContext';
import './styles/Books.css';

const Books = () => {
  
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const appContext = useContext(AppContext);
  const history = useHistory();
  
  useEffect(() => {
    getAllBooks();
  }, []);
    
  const getAllBooks = () => {
    new API().getAllBooks().then(data => {
        var mappedBooks = data.map((b, i)=> {
          b.color = `#${b.id*1}${b.id*1}${b.id*1}`;
        return b;
    })
    setBooks(mappedBooks);
  })}
  
  const handleBuy = (book) => {
    addToCart(book);
    history.push('/cart');
  }

  const handleAdd = (book) => {
    addToCart(book);
  }

  const addToCart = (book) => {
    if(!appContext.books.some(b => b.id === book.id)){
      setSelectedBooks([...selectedBooks, book]);
      appContext.addBooks([book]);
    }   
  }

  return (
    <div className="books-page">
      <h1 className="title">Buy Your Favourite Books Here!</h1>

      <div className="grid-container">
        {books.map((b, i) => {
          return (
        <div className="grid-item" style={{background: b.color}}>
            <div className="book">
              <div className="book-img"></div>
              <div className="book-details">
                <p>{b.isbn}</p>
                <h2>{b.title}</h2>
                <p>{b.author}</p>
                <span>${b.price}</span>
              </div>
              <div className="actions">
                <button type="submit" class="buyBtn btn" onClick={() => handleBuy(b)}>Buy</button>
                <button type="submit" class="addBtn btn" onClick={() => handleAdd(b)}>Add</button>
              </div>
            </div>
        </div>
        )})}
      </div>
    </div>
  );
}

export default Books;
