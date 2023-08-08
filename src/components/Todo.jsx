import React, { Fragment, useState } from "react";
import classes from "./Todo.module.css";

import Card from "./UI/Card";
import Listitems from "./Listitems";
import Model from "./UI/model";
import AddTodo from "./Form/AddTodo";
import ButtonContainer from "./Layout/ButtonContainer";

const data = localStorage.getItem("userData");

const localdata = JSON.parse(data);
let DUMMY_DATA;
if (!localdata) {
  DUMMY_DATA = [];
} else {
  DUMMY_DATA = localdata.map((a) => {
    return { ...a, date: new Date(a.date) };
  });
}
const Todo = () => {
  const [isFormView, setFormView] = useState(false);
  const [data, setData] = useState(DUMMY_DATA);
  const [update, setUpdate] = useState(false);
  const [filterdata, setFilterData] = useState(data);
  const [isTask, setIsTask] = useState("all");
  const [msg, setMsg] = useState("");
  let content1;

  const filterHandler = (completed) => {
    setIsTask(completed);
    // if (completed === `all`) {
    //   setFilterData(data);
    //   return;
    // }
    // const updated = data.filter((task) => task.task === completed);
    // setFilterData(updated);
    return;
  };

  const formViewHandler = () => {
    setFormView(true);
  };
  const formHideHandler = () => {
    setFormView(false);
    setUpdate(false);
  };

  const completedHandler = (id) => {
    const taskIndex = data.findIndex((task) => task.id === id);
    const totalTask = [...data];

    totalTask[taskIndex].task =
      totalTask[taskIndex].task === `completed` ? `incomplete` : `completed`;

    setData(totalTask);
    localStorage.setItem("userData", JSON.stringify(totalTask));
  };
  const successMessage = (message) => {
    setMsg(message);
    let interval = setTimeout(() => {
      setMsg();
    }, 3000);
  };

  const addTaskHandler = (value) => {
    setData((prev) => [
      {
        id: value.id,
        title: value.title,
        date: new Date(),
        task: value.isCompleted,
      },
      ...prev,
    ]);
    formHideHandler();
    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          id: value.id,
          title: value.title,
          date: new Date(),
          task: value.isCompleted,
        },
        ...data,
      ])
    );
    successMessage("✅ Added");
  };

  const deleteTaskHandler = (id) => {
    const deletedTask = data.filter((task) => task.id !== id);
    setData(deletedTask);
    localStorage.setItem("userData", JSON.stringify(deletedTask));
  };
  const updateTaskHandler = (value) => {
    const taskIndex = data.findIndex((task) => task.id === value.id);
    const copydata = [...data];
    copydata[taskIndex].title = value.title;
    copydata[taskIndex].isCompleted = value.isCompleted;
    setData(copydata);
    formHideHandler();
    setUpdate(false);
    successMessage("✅ Updated");
    localStorage.setItem("userData", JSON.stringify(copydata));
  };

  const formupdateHandler = (value) => {
    setUpdate(value);
    setFormView(true);
  };

  const updatedcontent =
    isTask === "all" ? data : data.filter((data) => data.task === isTask);

  const content = updatedcontent.length ? (
    updatedcontent.map((todo) => (
      <Listitems
        key={todo.id}
        id={todo.id}
        task={todo.task}
        title={todo.title}
        date={todo.date}
        onCheckbox={completedHandler}
        onDelete={deleteTaskHandler}
        onUpdate={formupdateHandler}
      />
    ))
  ) : (
    <h3>No Tasks</h3>
  );

  return (
    <Fragment>
      {isFormView && (
        <Model onHide={formHideHandler}>
          {content1 || (
            <AddTodo
              onHide={formHideHandler}
              onAdd={addTaskHandler}
              value={update}
              onUpdate={updateTaskHandler}
            />
          )}
        </Model>
      )}
      <div className={classes.container}>
        <header className={classes.header}>
          <h1>TODO LIST</h1>
        </header>
        <ButtonContainer
          onViewform={formViewHandler}
          onChangeSelect={filterHandler}
        />
        <Card className={classes.todolist}>{content}</Card>
      </div>
      {msg && <div className={classes.msg}>{msg} Successfully</div>}
    </Fragment>
  );
};

export default Todo;
