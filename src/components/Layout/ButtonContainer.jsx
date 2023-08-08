import React from "react";
import classes from "./ButtonContainer.module.css";
import Button from "../UI/Button";
import Select from "../UI/Select";

const ButtonContainer = (props) => {
  const selectChangeHandler = (e) => {
    props.onChangeSelect(e.target.value);
  };
  return (
    <div className={classes.buttoncontainer}>
      <Button type="button" onClick={props.onViewform}>
        Add Task
      </Button>
      <Select className={classes.selecttodo} onChange={selectChangeHandler}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </Select>
    </div>
  );
};

export default ButtonContainer;
