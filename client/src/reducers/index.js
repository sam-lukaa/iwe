import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import collection from "./collection";
import bookmarks from "./bookmarks";
import books from "./books"

export default combineReducers({alert, auth, collection, bookmarks, books});
