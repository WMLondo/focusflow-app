import React from "react";
import classes from "./Task.module.css";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import OutlineButton from "../OutlineButton/OutlineButton";

const Task = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

Task.Title = ({ children }) => {
  return <h3 className={classes.title}>{children}</h3>;
};

Task.Action = ({ children }) => {
  return <div className={classes.action}>{children}</div>;
};

Task.FollowButton = (props) => {
  const { children, click, status } = props;
  return status ? (
    <OutlineButton click={click}>{children}</OutlineButton>
  ) : (
    <Button click={click}>{children}</Button>
  );
};

Task.ExitButton = ({ click }) => {
  return <IoClose className={classes["exit-button"]} onClick={click} />;
};

export default Task;
