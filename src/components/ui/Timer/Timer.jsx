import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";

const Timer = (props) => {
  const { start, countdown, timerReset } = props;
  const [timer, setTimer] = useState(countdown);
  useEffect(() => {
    if (timer === 0) return props.startNext();
    if (!start) return;
    const intervalId = setInterval(() => {
      setTimer((prevState) => prevState - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, start]);

  useEffect(() => {
    setTimer(countdown)
  }, [timerReset, countdown])

  const formatPomodoroClock = (currentTimerValue) => {
    const currentTime = new Date(currentTimerValue);
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes} : ${seconds}`;
  };

  return (
    <span className={classes.pomodoroClock}>{formatPomodoroClock(timer)}</span>
  );
};

export default Timer;
