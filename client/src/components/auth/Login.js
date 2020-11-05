import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/books" />;
  }

  return (
    <Fragment>
      <form
        className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-auto mt-4 w-4/5"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="email"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            E-mail
          </label>
          <input
            type="text"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="jdoe@mail.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="password"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Password
          </label>
          <input
            type="password"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********************"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="m-auto text-center mt-5 flex justify-around align-center">
          <Link
            to="/forgotPass"
            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-700 mt-2"
          >
            Forgot password?
          </Link>

          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus focus:outline-shadow md:hidden">
            {" "}
            <i className="fa fa-sign-in" aria-hidden="true"></i>{" "}
          </button>
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus focus:outline-shadow hidden md:inline-block">
            {loading ? <Spinner /> : "Login"}
          </button>
        </div>

        <div className="text-center m-auto mt-4 grid md">
          <Link to="/register.html" className="md:hidden mb-4 text-teal-500">
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </Link>
          <Link
            to="/register"
            className="align-baseline font-bold text-sm text-teal-500 hover:text-teal-700 hidden md:inline-block mb-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
