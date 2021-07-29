import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    books: [],
    signedUser: {},
    addBooks: () => {},
    removeBooks: () => {},
    removeAllBooks: () => {},
});

export const AppContextProvider = props => {

    const [books, setBooks] = useState([]);
    const [signedUser, setSignedUser] = useState({
        name: "",
        email: "",
        type: ""
    });

    const addBooks = (bookList) => {
        setBooks([...books, ...bookList]);
    };

    const removeBooks = (index) => {
        books.splice(index, 1);
        setBooks([...books]);
    };
    const removeAllBooks = () => {
        books.splice(0, books.length);
        setBooks([]);
    };

    const addSignedUser = (user) => {
        setSignedUser(user);
    }

    return (
        <AppContext.Provider value={{ 
            books: books,
            signedUser: signedUser,
            addBooks: addBooks,
            removeBooks: removeBooks,
            removeAllBooks: removeAllBooks,
            addSignedUser: addSignedUser,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};