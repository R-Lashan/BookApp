import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import "./styles/Cart.css";

const Cart = () => {

  const [items, setItems] = useState([]);
  const appContext = useContext(AppContext);

  useEffect(() => {
    setItems([...appContext.books]);
  }, [appContext.books])

  return (
    <div className="cart-page">
      <table>
        {items.map((book, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default Cart;