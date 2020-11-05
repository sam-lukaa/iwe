import {
  GET_BOOKMARKS,
  ADD_BOOKMARK,
  CLEAR_BOOKMARKS,
  BOOKMARKS_ERROR,
} from "../actions/types";

const initialState = {
  bookmarks: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKMARKS:
    case ADD_BOOKMARK:
    case CLEAR_BOOKMARKS:
      return {
        ...state,
        bookmarks: payload,
        loading: false,
      };
    case BOOKMARKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
