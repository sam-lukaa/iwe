import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    mobile: "",
  });

  const { email, password, password2, mobile } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password2 !== password) {
      setAlert("Passwords do not match", "red");
    } else {
      register({ email, password, mobile });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <form
        className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-auto mt-4 mb-4 w-4/5"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="email"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Email
          </label>
          <input
            type="email"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Jdoe@mail.com"
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

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="password2"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********************"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="mobile"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Mobile
          </label>
          <input
            type="tel"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="08123456789"
            name="mobile"
            value={mobile}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="flex text-center justify-around m-auto mt-8">
          <Link to="./login" className="md:hidden mt-2 text-teal-500">
            <i className="fa fa-sign-in" aria-hidden="true"></i>
          </Link>
          <Link
            to="/login"
            className="align-baseline font-bold text-sm text-teal-500 hover:text-teal-700 hidden md:inline-block mb-4"
          >
            Sign in
          </Link>

          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus focus:outline-shadow md:hidden">
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus focus:outline-shadow hidden md:inline-block">
            Sign up
          </button>
        </div>
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
