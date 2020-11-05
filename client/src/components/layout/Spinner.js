import React, { Fragment } from "react";
import spinner from "../img/Bean Eater-1s-200px.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        with: "350px",
        margin: "auto",
        display: "block",
      }}
      alt="loading"
    />
  </Fragment>
);