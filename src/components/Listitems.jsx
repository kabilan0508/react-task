import React, { useState } from "react";
import icon from "../assets/delete.svg";
import classes from "./ListItems.module.css";
import penicon from "../assets/pen.svg";

function changeTimeFormat(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  let newformat = hours >= 12 ? "PM" : "AM";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + newformat;
}

const Listitems = (props) => {
  const datetimeformat =
    changeTimeFormat(props.date) +
    ", " +
    props.date.toLocaleDateString("en-GB");

  return (
    <div className={classes.listItem}>
      <div className={classes.titlecontainer}>
        <input
          type="checkbox"
          className={classes.checkbox}
          onChange={() => props.onCheckbox(props.id)}
          checked={props.task === "completed" ? true : false}
        ></input>
        <div className={classes.title}>
          <p className={props.task === `completed` ? classes.strikeout : " "}>
            {props.title}
          </p>
          <p className={classes.date}>{datetimeformat}</p>
        </div>
      </div>
      <div className={classes.listbuttoncontainer}>
        <button
          className={classes.iconbutton}
          onClick={() => props.onDelete(props.id)}
        >
          <img src={icon} />
        </button>
        <button
          className={classes.iconbutton}
          onClick={() =>
            props.onUpdate({
              id: props.id,
              title: props.title,
              task: props.task,
            })
          }
        >
          <img src={penicon} />
        </button>
      </div>
    </div>
  );
};

export default Listitems;
