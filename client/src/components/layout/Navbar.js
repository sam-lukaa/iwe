import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <div className="block">
      <Link
        to="/"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4"
      >
        <i className="fa fa-book fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4"
      >
        Books
      </Link>

      <Link
        to="/bookmark"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4"
      >
        <i className="fa fa-bookmark fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/bookmark"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4"
      >
        Bookmarks
      </Link>

      <Link
        to="/collection"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4"
      >
        <i className="fa fa-file fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/collection"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4"
      >
        Collections
      </Link>

      <Link
        to="/login"
        onClick={logout}
        className="md:hidden mb-4 hover:text-white mr-4"
      >
        <i className="fa fa-sign-out fa-lg text-red-500" aria-hidden="true"></i>
      </Link>
      <Link
        to="/login"
        onClick={logout}
        className="align-baseline font-bold text-sm text-red-500 hover:text-red-700 hidden md:inline-block  mr-4"
      >
        Logout
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="block">
      <Link
        to="/"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4">
        <i className="fa fa-book fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4">
        Books
      </Link>

      <Link
        to="/login"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4">
        <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/login"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4">
        Login
      </Link>

      <Link
        to="/register"
        className="md:hidden mb-4 text-teal-100 hover:text-white mr-4">
        <i className="fa fa-user-plus fa-lg" aria-hidden="true"></i>
      </Link>
      <Link
        to="/register"
        className="align-baseline font-bold text-sm text-teal-100 hover:text-white hidden md:inline-block mr-4">
        Register
      </Link>

      <Link to="#!" className="md:hidden">
        <i className="fa fa-info-circle text-white" aria-hidden="true"></i>
      </Link>
      <Link
        to="#!"
        className="text-sm text-white px-4 py-2 leading-none border border-white rounded hover:border-transparent hover:text-teal-500 hover:bg-white hidden md:inline-block">
        About
      </Link>
    </div>
  );

  return (
    <nav className="w-full flex flex-wrap items-center justify-between bg-teal-500 p-3 sticky top-0">
      <div className="flex flex-shrink-0 text-center text-white mr-6">
        <span className="font-bold text-l">
          <Link to="/" className="hover:text-teal-200">
            IWÉ
          </Link>
        </span>
      </div>
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
