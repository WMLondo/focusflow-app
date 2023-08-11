import React from "react";
import classes from "./TaskButton.module.css";
import { IoCaretDownOutline } from "react-icons/io5";

const TaskButton = (props) => {
  return (
    <span className={classes.button} onClick={props.click}>
      {props.children}
      <IoCaretDownOutline className={classes.icon} />
    </span>
  );
};

export default TaskButton;
