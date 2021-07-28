import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    books: [],
    addBooks: () => {},
    removeBooks: () => {},
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

    return (
        <AppContext.Provider value={{ 
            books: books,
            addBooks: addBooks,
            removeBooks: removeBooks,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};