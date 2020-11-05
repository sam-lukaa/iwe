import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCollectionItem } from "../../actions/collection";

const CollectionActions = ({
  collectionItems: { _id, bookImage, title, author, price },
  deleteCollectionItem,
}) => {
  return (
    <Fragment>
      <div className="books my-2 grid md:grid-cols-2 ">
        <div className="max-w-sm rounded overflow-hidden shadow-lg text-center m-auto mb-4">
          <img src={bookImage} alt="nigeria" className="w-full h-64" />
          <div className="px-6 py-4">
            <div className="font-bold mb-2 text-md">{title}</div>
            <div className="font-bold mb-2 text-lg text-gray-600">{author}</div>
            <p className="text-gray-700 text-base">{price} NGN</p>
            <div className="px-6 py-4 flex justify-evenly">
              <button
                onClick={(e) => deleteCollectionItem(_id)}
                className="md:hidden"
              >
                <i
                  className="fa fa-minus fa-lg text-red-700"
                  aria-hidden="true"
                ></i>
              </button>
              <button
                onClick={(e) => deleteCollectionItem(_id)}
                className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-red-700 mr-2 hidden md:inline-block"
              >
                Delete
              </button>

              <a href="addBook.html" className="md:hidden">
                <i
                  className="fa fa-pencil fa-lg text-gray-700"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="addBook.html"
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hidden md:inline-block"
              >
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CollectionActions.propTypes = {
  collectionItems: PropTypes.object.isRequired,
  deleteCollectionItem: PropTypes.func.isRequired,
};

export default connect(null, { deleteCollectionItem })(CollectionActions);
