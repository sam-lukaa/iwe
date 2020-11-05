import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Books from "./components/layout/Books";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Collection from "./components/collection/Collection";
import Bookmarks from "./components/bookmarks/Bookmarks";
import CreateBook from "./components/book-form/CreateBook";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Login} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/books" component={Books} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/collection" component={Collection} />
              <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
              <PrivateRoute exact path="/addBook" component={CreateBook} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
