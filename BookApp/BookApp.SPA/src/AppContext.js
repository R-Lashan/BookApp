import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    books: [],
    addBooks: () => {},
});

export const AppContextProvider = props => {

    const [books, setBooks] = useState([]);

    const addBooks = (bookList) => {
        setBooks([...books, ...bookList]);
    };

    return (
        <AppContext.Provider value={{ 
            books: books,
            addBooks: addBooks,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};