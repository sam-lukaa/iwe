import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createBook } from "../../actions/collection";
// import Spinner from "../layout/Spinner";

const CreateBook = ({ createBook, history }) => {
  //
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    brief: "",
    price: "",
  });
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("Choose file");

  const { title, author, brief, price } = formData;

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("bookImage", image);
    payload.append("title", formData.title);
    payload.append("author", formData.author);
    payload.append("brief", formData.brief);
    payload.append("price", formData.price);

    for (let val of payload.values()) {
      console.log(val);
    }

    createBook(payload, history);
  };

  return (
    <Fragment>
      <form
        className="bg-white shadow-md rounded px-8 pt-8 pb-8 m-auto mt-4 mb-4 w-4/5"
        onSubmit={(e) => onSubmit(e)}
        encType="multipart/form-data">

        <div className="mb-4 w-3/4 flex justify-around items-center m-auto">
          <button className="bg-teal-400 hover:bg-indigo-dark text-gray-700 font-bold py-2 px-4 w-full inline-flex justify-center items-center text-center">
            <svg
              fill="#FFF"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
            <span className="ml-2">{filename}</span>
          </button>
          <input
            className="cursor-pointer absolute block opacity-0 pin-r pin-t"
            type="file"
            onChange={(e) => onFileChange(e)}
            accept="image/*" 
            multiple
          />
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="title"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Title
          </label>
          <input
            type="text"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="The Story Begins"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="author"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Author
          </label>
          <input
            type="text"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600   leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
            name="author"
            value={author}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="brief"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Brief
          </label>
          <textarea
            className=" w-full h-40 shadow appearance-none border rounded text-gray-600 leading-tight        
            focus:outline-none focus:shadow-outline outline-none"
            name="brief"
            value={brief}
            onChange={(e) => onChange(e)}
          >
            Brief(less than 50 words)
          </textarea>
        </div>

        <div className="mb-4 flex justify-around items-center">
          <label
            htmlFor="price"
            className="w-24 text-gray-700 text-sm font-bold mb-2 mr-2 hidden md:block"
          >
            Price
          </label>
          <input
            type="number"
            className="inline-block w-full shadow appearance-none border rounded py-3 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="300 NGN"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="m-auto text-center mt-5">
          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus  focus:outline-shadow md:hidden">
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>

          <button className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded py-2 px-4 focus:outline-focus   focus:outline-shadow hidden md:inline-block">
            Create Book 
          </button>
        </div>
      </form>
    </Fragment>
  );
};

CreateBook.propTypes = {
  createBook: PropTypes.func.isRequired,
};

export default connect(null, { createBook })(withRouter(CreateBook));
