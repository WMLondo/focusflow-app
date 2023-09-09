import React, { memo, useEffect } from "react";
import { Title } from "react-head";
import countdownSound from "../.../../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import { APP_TITLE } from "../../../constants/configuration";
import { POMODORO_STATUS } from "../../../constants/pomodoro-status";
import { TASK_STATUS_VALUE } from "../../../constants/task-status";
import { useCountdown } from "../../../context/countdown-context";
import { useTask } from "../../../context/task-context";
import useAudio from "../../../hooks/use-audio";
import { formatTime } from "../../../utils/format-time";
import {
  clearWorkerInterval,
  setWorkerInterval,
} from "../../../utils/worker-timer";
import classes from "./Timer.module.css";

const Timer = (props) => {
  const { started, time, defaultTime, variant, startNext } = props;
  const { getTask, updateTaskHandler } = useTask();
  const countdownAudio = useAudio(countdownSound);
  const { setTime } = useCountdown();
  const currentTask = getTask(
    (task) => task.status === TASK_STATUS_VALUE.FOLLOW
  );

  const updateInvertedTime = () => {
    if (currentTask === undefined) return;
    currentTask.investedTime += 1000;
    updateTaskHandler(currentTask);
  };

  useEffect(() => {
    if (!started) return;

    if (time === 0 && countdownValues.isStarted) return startNext();

    if (time === 1000 * 5) countdownAudio.play();

    const intervalId = setWorkerInterval(() => {
      setTime(time - 1000);
      defaultTime === POMODORO_STATUS[0].timeAmount && updateInvertedTime();
    }, 1000);
    return () => clearWorkerInterval(intervalId);
  }, [time, started]);

  let titleFormatted = `${formatTime(time)} | ${APP_TITLE.POMODORO}`;

  if (defaultTime !== POMODORO_STATUS[0].timeAmount)
    titleFormatted = formatTime(time) + " | " + APP_TITLE.REST;

  return (
    <>
      <Title>{titleFormatted}</Title>
      <span className={classes.pomodoroClock} style={variant}>
        {formatTime(time)}
      </span>
    </>
  );
};

export default memo(Timer);
