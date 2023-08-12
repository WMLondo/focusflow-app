import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.container}>
      <p className={classes.quote}>
        "El éxito es la suma de pequeños esfuerzos repetidos día tras día"
      </p>
      <span className={classes.author}>-Robert Collier</span>
      <div className={classes["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
