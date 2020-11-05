import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CollectionActions from "./CollectionActions";
import { getCurrentCollection } from "../../actions/collection";

const Collection = ({
  getCurrentCollection,
  auth,
  collection: { collection, loading },
}) => {
  useEffect(() => {
    getCurrentCollection();
  }, [getCurrentCollection]);

  return (
    <Fragment>
      {loading ? (
        <div className="m-auto mt-1/2">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          {/* {user === auth.user ? <p>Verified</p> : <p>not verified</p>} */}
          {collection.length <= 1 ? (
            <h3 className="text-center text-gray-700">
              You have {collection.length} book in your collection
            </h3>
          ) : (
            <h3 className="text-center text-gray-700">
              You have {collection.length} books in your collection
            </h3>
          )}

          {collection.length > 0 ? (
            collection.map((collectionItems) => (
              <CollectionActions
                key={collection._id}
                id={collection._id}
                collectionItems={collectionItems}
              />
            ))
          ) : (
            <div className="text-center mt-6 flex flex-col justify-center items-center space-y-4">
              <p className="text-gray-600 mb-6">
                You do not have a collection, please add some books.
              </p>
              <Link
                to="/addBook"
                className="p-4 w-2/4 bg-transparent hover:bg-teal-400 text-teal-400 font-semibold hover:text-white border border-teal-500 hover:border-transparent rounded m-auto"
              >
                Add Book
              </Link>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Collection.propTypes = {
  getCurrentCollection: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  collection: state.collection,
});

export default connect(mapStateToProps, {
  getCurrentCollection,
})(Collection);
