import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./Components/BookShelf";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(b => {
      this.setState({
        books: b
      });
    });
  }

  /*TODO: Perfomance issue: 
  Is better add 3 more fields in state or execute filter operation in render method? 
  I believe that is better let filter operation on render method instead create 3 extras states field. 
  Anyway, filter operation will be called on componentDidMount. */

  render() {
    const { books } = this.state;
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );

    const read = books.filter(book => book.shelf === "read");

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                shelfTitle="Currently Reading"
                books={currentlyReading}
              />
              <BookShelf shelfTitle="Want to Read" books={wantToRead} />
              <BookShelf shelfTitle="Read" books={read} />
              <div />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
