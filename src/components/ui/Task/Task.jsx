import React from "react";
import classes from "./Task.module.css";
import { IoClose } from "react-icons/io5";

const Task = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

Task.Title = ({ children }) => {
  return <h3 className={classes.title}>{children}</h3>;
};

Task.FollowButton = (props) => {
  const { children, click, variant } = props;
  return (
    <button
      className={classes["follow-button"]}
      onClick={click}
      style={{ backgroundColor: variant ? variant : "" }}
    >
      {children}
    </button>
  );
};

Task.ExitButton = ({ click }) => {
  return <IoClose className={classes["exit-button"]} onClick={click} />;
};

export default Task;
