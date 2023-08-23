import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";
import useAudio from "../../../hooks/use-audio";
import countdownAudio from "../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import { useTask } from "../../../context/task-context";
import { TASK_STATUS_VALUE } from "../../../constants/task-status";
import { formatTime } from "../../../utils/format-time";

const Timer = (props) => {
  const { start, countdown, timerReset } = props;
  const { getTask, updateTaskHandler } = useTask();
  const [timer, setTimer] = useState(countdown);
  const audio = useAudio(countdownAudio);

  let currentTask = {};

  const updateInvertedTime = () => {
    if (currentTask === undefined || Object.keys(currentTask).length === 0)
      return;
    currentTask.investedTime += 1000;
    console.log(currentTask.investedTime);
    updateTaskHandler(currentTask);
  };

  useEffect(() => {
    if (countdown >= 1000 * 60 * 25) {
      currentTask = getTask(
        (followedTask) => followedTask.status === TASK_STATUS_VALUE.FOLLOW
      );
    }
  }, [currentTask]);

  useEffect(() => {
    if (timer === 0) return props.startNext();

    if (timer === 1000 * 5) audio.play();

    if (!start) return;
    const intervalId = setInterval(() => {
      setTimer((prevState) => prevState - 1000);
      updateInvertedTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, start]);

  useEffect(() => {
    setTimer(countdown);
  }, [timerReset, countdown]);

  return <span className={classes.pomodoroClock}>{formatTime(timer)}</span>;
};

export default Timer;
