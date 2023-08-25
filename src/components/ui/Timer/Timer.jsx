import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";
import useAudio from "../../../hooks/use-audio";
import countdownAudio from "../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import { useTask } from "../../../context/task-context";
import { TASK_STATUS_VALUE } from "../../../constants/task-status";
import { formatTime } from "../../../utils/format-time";
import { Title } from "react-head";
import { APP_TITLE } from "../../../constants/configuration";
import { POMODORO_STATUS } from "../../../constants/pomodoro-status";

const Timer = (props) => {
  const { start, countdown, timerReset, variant } = props;
  const { getTask, updateTaskHandler } = useTask();
  const [timer, setTimer] = useState(countdown);
  const audio = useAudio(countdownAudio);

  let currentTask = null;
  let titleFormatted = `${formatTime(timer)} | ${APP_TITLE.POMODORO}`;

  const updateInvertedTime = () => {
    if (currentTask === null) return;
    currentTask.investedTime += 1000;
    updateTaskHandler(currentTask);
  };

  useEffect(() => {
    if (countdown >= POMODORO_STATUS[0].timeAmount) {
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
    if (
      countdown >= POMODORO_STATUS[1].timeAmount ||
      countdown >= POMODORO_STATUS[2].timeAmount
    )
      titleFormatted = formatTime(timer) + "|" + APP_TITLE.REST;
  }, [timerReset, countdown]);

  return (
    <>
      <Title>{titleFormatted}</Title>
      <span className={classes.pomodoroClock} style={variant}>
        {formatTime(timer)}
      </span>
    </>
  );
};

export default Timer;
