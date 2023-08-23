import React from "react";
import classes from "./StatusTitle.module.css";

const StatusTitle = (props) => {
  return (
    <span className={classes.status} style={props.variant}>
      {props.children}
    </span>
  );
};

export default StatusTitle;
