import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  async function fetchBooks() {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      console.log("Response data:", response.data);
      if (response.data.items && Array.isArray(response.data.items)) {
        setBooks(response.data.items);
      }
      }

  useEffect(() => {
    fetchBooks();
  }, [query]);

  return (
    <div className="App">
      <h1 className="app-title">Find a Book</h1>
      <div>
        <input 
          placeholder="Enter The Title Of Book"
          onChange={(event) => setQuery(event.target.value)}
          value={query} 
        />
      </div>
      
      <ul className="book-list">
        {books.filter((book) => {
          if (query === "") {
            return book;
          } else if (book.volumeInfo.title.toLowerCase().includes(query.toLowerCase())) {
            return book;
          }
        }).map((book, index) => (
          <li key={index}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
