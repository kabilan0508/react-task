import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  return (
    <select {...props} className={`${classes.select} ${props.className}`}>
      {props.children}
    </select>
  );
};

export default Select;
