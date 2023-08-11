import React from "react";
import classes from "./TaskOption.module.css";

const TaskOption = (props) => {
  const { children, click, value } = props;
  return (
    <li onClick={click} className={classes.task} value={value}>
      {children}
    </li>
  );
};

export default TaskOption;
