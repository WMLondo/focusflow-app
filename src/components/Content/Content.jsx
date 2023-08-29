import React, { lazy } from "react";
import Pomodoro from "../Pomodoro/Pomodoro";
import TaskMenu from "../TaskMenu/TaskMenu";
import classes from "./Content.module.css";
const Tasks = lazy(() => import("../Tasks/Tasks"));
const Header = lazy(() => import("../Header/Header"));
const Configuration = lazy(() => import("../Configuration/Configuration"));

const Content = () => {
  return (
    <div className={classes.centered}>
      <Configuration />
      <Header />
      <Pomodoro />
      <TaskMenu />
      <Tasks />
    </div>
  );
};

export default Content;
