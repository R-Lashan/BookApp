import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppContext } from '../AppContext';
import "./styles/Cart.css";
import API from '../API';

const Cart = () => {

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const appContext = useContext(AppContext);
  const history = useHistory();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const signedInUser = storedUser !== null ? storedUser : appContext.emptyUser;
  const [signedUser, setSignedUser] = useState(signedInUser);

  useEffect(() => {
    setItems([...appContext.books]);
  }, [appContext.books])

  useEffect(() => {
    calculateTotalPrice(items);
  }, [items])

  useEffect(() => {
    setSignedUser(signedInUser);
  }, [signedInUser.type]);

  const handleRemove = (index) => {
    setItems([...appContext.books]);
    appContext.removeBooks(index);
  }

  const handleRemoveAll = () => {
    setItems([]);
    appContext.removeAllBooks();
  }

  const handleChange = (e, book, index) => {
    var qty = e.target.value;
    if(qty > 0){
      book.quantity = qty;
      var newArr = [...items];
      newArr[index] = book;
      setItems([...newArr]);
      calculateTotalPrice(newArr);
    }
  }

  const calculateTotalPrice = (newArr) => {
    var totalPrice = newArr.reduce((accumulator, current) => {
      return accumulator + (current.price * current.quantity);
    }, 0)
    setTotalPrice(totalPrice.toFixed(2));
  }

  const handleCheckout = (totalPrice) => {
    if(signedUser.type === "customer"){
      userCheckout(totalPrice)
    }
    else if (signedUser.type === "admin"){
      alert("Admin cannot checkout. Please login as a Customer");
      handleRemoveAll();
      history.push('/login');
    }
    else {
      history.push('/login');
    }
  }

  const userCheckout = (totalPrice) => {
    var totalQty = items.reduce((accumulator, current) => {
      return accumulator + current.quantity * 1;
    }, 0)

    if(totalPrice > 0) {
      alert(`You have succcessfuly purchased ${totalQty} Books for $${totalPrice}. \nThank you!`)
      saveInvoice(signedUser.id, totalPrice*1);
    } 
    else {
      alert("Please add books before checking out.")
    }
    handleRemoveAll();
    history.push('/books');
  }

  const saveInvoice = (userId, totalPrice) => {
    var invoice = {
      userId: userId,
      totalPrice: totalPrice,
      bookIds: []
    };
    const mappedBooks = items.map(b => {
      invoice.bookIds.push(b.id);
    });
    new API().postInvoice(invoice).then(data => {})
  }

  return (
    <div className="cart-page">
      {
        items.length > 0 ?
          <div>
            <h1 className="title">Listed Books</h1>
            <table className="table">
                <div className="table-head">
                  <tr className="th-row">
                    <th>No.</th>
                    <th>ISBN</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </div>
                <div className="table-body">
                  {items.map((book, i) => {
                    return (
                      <tr className="td-row">
                        <td>{i + 1}</td>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          <input className="qty" type="number" name="quantity" placeholder="Qty" value={book.quantity} onChange={(e) => handleChange(e, book, i)}></input>
                        </td>
                        <td>{(book.price * book.quantity).toFixed(2)}</td>
                        <td>
                          <button className="remove-btn" onClick={() => handleRemove(i)}>X</button>
                        </td>
                      </tr>
                    )
                  })}
                </div>
            </table>
            <div className="checkout">
              <div>
                <span className="total">${totalPrice}</span>
                <span>
                  <button className="checkout-btn" onClick={() => handleCheckout(totalPrice)}>Checkout</button>
                </span>
              </div>
            </div>
          </div>
          :
          <div className="message-box">
            <h1>Cart is Empty :(</h1>
            <h3>Please add some Books to Purchase.</h3>
            <button onClick={() => history.push('/books')}>Go to Books</button>
          </div>
      }
    </div>
  );
}

export default Cart;