import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCurrentBookmarks } from "../../actions/bookmarks.js";

const Bookmarks = ({
  getCurrentBookmarks,
  bookmarks: { bookmarks, loading },
}) => {
  useEffect(() => {
    getCurrentBookmarks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      {bookmarks.length > 0} ?
      <Fragment>
        {bookmarks.map((bookmark) => (
          <Fragment>
            <p>You have {bookmark.length} bookmarks</p>
            <h3>bookmark.title</h3>
          </Fragment>
        ))}
      </Fragment>
      : <h3>No Bookmarks added yet</h3>
    </Fragment>
  );
};

Bookmarks.propTypes = {
  getCurrentBookmarks: PropTypes.func.isRequired,
  bookmarks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks,
});

export default connect(mapStateToProps, { getCurrentBookmarks })(Bookmarks);
