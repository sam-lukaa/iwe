import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  CLEAR_BOOKMARKS,
  BOOKMARKS_ERROR,
} from "./types";

export const getCurrentBookmarks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/bookmark");

    dispatch({
      type: GET_BOOKMARKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addBookmark = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/bookmark");

    dispatch({
      type: ADD_BOOKMARK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const clearBookmarks = () => async (dispatch) => {
  try {
    const res = await axios.delete("api/bookmark");

    dispatch({
      type: CLEAR_BOOKMARKS,
      payload: res.data,
    });

    dispatch(setAlert("Bookmarks deleted", "red"));
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
