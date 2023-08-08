import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./AddTodo.module.css";
import Button from "../UI/Button";
import Select from "../UI/Select";
import closeicon from "../../assets/close.svg";

const AddTodo = (props) => {
  const [title, setTitle] = useState(props.value ? props.value.title : "");
  const [select, setSelect] = useState(
    props.value ? props.value.task : `incomplete`
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const id = props.value ? props.value.id : Math.floor(Math.random() * 1000);
    props.value
      ? props.onUpdate({ id: id, title: title, isCompleted: select })
      : props.onAdd({ id: id, title: title, isCompleted: select });
  };

  const selectHandler = (e) => {
    const isCompleted = e.target.value;
    setSelect(isCompleted);
  };

  const typeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Card className={classes.inputform}>
      <div className={classes.closebutton} onClick={props.onHide}>
        <img src={closeicon} />
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.heading}>
          <p>{props.value ? "Update" : "Add"} TODO</p>
        </div>
        <div className={classes.forminput}>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={typeHandler}
            required
          ></input>
        </div>
        <div className={classes.forminput}>
          <label htmlFor="">Status</label>
          <Select
            className={classes.selectform}
            onChange={selectHandler}
            value={select === `completed` ? `completed` : `incomplete`}
          >
            <option>incomplete</option>
            <option>completed</option>
          </Select>
        </div>
        <div className={classes.actions}>
          <Button type="submit">{props.value ? "Update" : "Add"} Task</Button>
          <Button
            type="button"
            onClick={props.onHide}
            className={classes.cancelbutton}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddTodo;
