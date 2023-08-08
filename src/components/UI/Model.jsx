import React, { Fragment } from "react";
import classes from "./model.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay = (props) => {
  return <div className={classes.overlay}>{props.children}</div>;
};

const parentEl = document.getElementById("overlays");

const Model = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop  onClick={props.onHide}/>, parentEl)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,parentEl)}
    </Fragment>
  );
};

export default Model;
