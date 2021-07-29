import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    books: [],
    addBooks: () => {},
    removeBooks: () => {},
    removeAllBooks: () => {}
});

export const AppContextProvider = props => {

    const [books, setBooks] = useState([]);

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

    return (
        <AppContext.Provider value={{ 
            books: books,
            addBooks: addBooks,
            removeBooks: removeBooks,
            removeAllBooks: removeAllBooks,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};