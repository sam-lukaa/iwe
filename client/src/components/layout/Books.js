import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BookData from "../img/bookData";
import Spinner from "../layout/Spinner";

import { getAllBooks } from "../../actions/books";
import { addBookmark } from "../../actions/bookmarks";
import { connect } from "react-redux";
// import auth from "../../reducers/auth";

const Books = ({ getAllBooks, books: { books, loading }, auth }) => {
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className="flex w-3/4 justify-between align-center m-auto">
        <div className="searchContainer flex justify-between m-4 border border-teal-400 h-10 p-2 rounded">
          <input
            className="searchBox border-none"
            type="search"
            name="search"
            placeholder="Search Books"
          />

          <Link to="#">
            <i className="fa fa-search-plus fa-lg text-teal-500 hover:bg-teal-500 hover:text-white rounded"></i>
          </Link>
        </div>

        <Link to="/addBook" className="btn btn-green mt-4 h-full md:hidden">
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
        </Link>

        <Link
          to="./addBook"
          className="btn btn-green mt-4 h-full hidden md:inline-block"
        >
          Add Book
        </Link>
      </div>
      <div className="p-6">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {books.length > 0 ? (
              books.map((book) => (
                <BookData
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  src={book.bookImage}
                />
              ))
            ) : (
              <p>No books</p>
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

Books.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllBooks, addBookmark })(Books);
