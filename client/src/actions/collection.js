import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_COLLECTION,
  DELETE_COLLECTION_ITEM,
  COLLECTION_ERROR,
} from "./types";

// Get current users collection
export const getCurrentCollection = () => async (dispatch) => {
  try {
    const res = await axios.get("api/collections");

    dispatch({
      type: GET_COLLECTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Collections Item
export const deleteCollectionItem = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      const res = await axios.delete(`/api/book/${id}`);

      dispatch({
        type: DELETE_COLLECTION_ITEM,
        payload: (id, res),
      });

      dispatch(setAlert("Book removed from collection", "green"));
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Create or edit book
export const createBook = (payload, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/api/book/addBook", payload, config);

    console.log(res.data);

    dispatch({
      type: GET_COLLECTION,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Book Updated" : "Book Created", "green"));

    if (!edit) history.push("./books");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, "red")));

    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
