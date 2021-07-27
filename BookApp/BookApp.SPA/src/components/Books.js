import React, { useEffect, useState } from 'react';
import API from '../API';
import './styles/Books.css';

const Books = () => {
  
  const [books, setBooks] = useState([]);
  const colors = ["rgb(52, 99, 75)", "rgb(52, 80, 99)", "rgb(107, 57, 92)", 
  "rgb(0, 127, 177)", "rgb(240, 147, 9)", "rgb(22, 150, 39)", "rgb(226, 25, 25)"];

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    new API().getAllBooks().then(data => {
      setBooks(data);
    })
  }

  const addBook = () => {
    
  }
  const buyBook = () => {
    
  }

  return (
    <div className="books-page">
      <h1 className="title">Buy Your Favourite Books Here!</h1>

      <div className="grid-container">
        {books.map((b, i) => {
          return (
        <div className="grid-item" style={{background: `${colors[Math.floor(Math.random() * 8)]}`}}>
            <div className="book">
              <div className="book-img"></div>
              <div className="book-details">
                <p>{b.isbn}</p>
                <h2>{b.title}</h2>
                <p>{b.author}</p>
                <span>${b.price}</span>
              </div>
              <div className="actions">
                <button type="submit" class="buyBtn btn" onClick={(e) => buyBook(e)}>Buy</button>
                <button type="submit" class="addBtn btn" onClick={(e) => addBook(e)}>Add</button>
              </div>
            </div>
        </div>
        )})}
      </div>
    </div>
  );
}

export default Books;
