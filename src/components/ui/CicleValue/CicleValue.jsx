import React, { useId } from "react";
import { GiTomato } from "react-icons/gi";
import classes from "./CicleValue.module.css";
import { POMODORO_CICLE } from "../../../constants/configuration";

const CicleResult = ({ currentPomodoro }) => {
  const tomatoId = useId();

  return (
    <span className={classes.container}>
      {Array.from({ length: POMODORO_CICLE }).map((_, index) => (
        <GiTomato
          key={tomatoId + index}
          data-active={currentPomodoro >= index + 1 && "true"}
          className={classes.icon}
        />
      ))}
    </span>
  );
};

export default CicleResult;
