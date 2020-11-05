import { GET_BOOKS, BOOKS_ERROR } from "./types";
import axios from "axios";

export const getAllBooks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/book");

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
