import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    books: [],
    emptyUser: {},
    user: {},
    addBooks: () => {},
    addUser: () => {},
    removeBooks: () => {},
    removeAllBooks: () => {}
});

export const AppContextProvider = props => {

    const [books, setBooks] = useState([]);
    const [emptyUser, setEmptyUser] = useState({
        name: "",
        email: "",
        type: ""
    });

    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        type: 0,
        password: "",
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

    const addUser = (user) => {
        setUser(user);
    }

    return (
        <AppContext.Provider value={{ 
            books: books,
            emptyUser: emptyUser,
            user: user,
            addBooks: addBooks,
            addUser: addUser,
            removeBooks: removeBooks,
            removeAllBooks: removeAllBooks,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};