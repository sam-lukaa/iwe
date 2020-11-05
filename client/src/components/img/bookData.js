import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const bookData = ({ title, author, price, src, addBookmark }) => {
  return (
    <Fragment>
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-center m-auto mb-4">
        <img src={src} alt="culture" className="w-full h-64" />

        <div className="px-6 py-4">
          <div className="font-bold mb-2 text-md"> {title} </div>

          <div className="font-bold mb-2 text-lg text-gray-600">{author}</div>

          <p className="text-gray-700 text-base">{price}</p>

          <div className="px-6 py-4 flex justify-evenly">
            <Link to="#!" className="md:hidden">
              <i
                className="fa fa-bookmark fa-lg text-gray-700"
                aria-hidden="true"
              >
                {" "}
              </i>
            </Link>

            <button
              className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hidden md:inline-block"
              onClick={() => addBookmark()}
            >
              Bookmark
            </button>

            <Link to="#!" className="md:hidden">
              <i className="fa fa-money fa-lg text-gray-700" aria-hidden="true">
                {" "}
              </i>
            </Link>

            <Link
              to="#!"
              className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hidden md:inline-block"
            >
              Purchase
            </Link>

            <Link to="/bookView" className="md:hidden">
              <i className="fa fa-eye fa-lg text-gray-700" aria-hidden="true">
                {" "}
              </i>
            </Link>

            <Link
              to="/bookView"
              className="bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hidden md:inline-block"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default bookData;
