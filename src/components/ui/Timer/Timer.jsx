import React, { memo, useEffect } from "react";
import { Title } from "react-head";
import { clearInterval, setInterval } from "worker-timers";
import countdownSound from "../.../../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import { APP_TITLE } from "../../../constants/configuration";
import { POMODORO_STATUS } from "../../../constants/pomodoro-status";
import { TASK_STATUS_VALUE } from "../../../constants/task-status";
import useAudio from "../../../hooks/use-audio";
import { usePomodoro } from "../../../store/pomodoro";
import { formatTime } from "../../../utils/format-time";
import classes from "./Timer.module.css";

const Timer = (props) => {
  const { variant, startNext } = props;
  const {
    getTask,
    updateTask,
    started,
    time,
    defaultTime,
    isStarted,
    setTime,
  } = usePomodoro((state) => ({
    getTask: state.getTask,
    updateTask: state.updateTask,
    started: state.started,
    time: state.time,
    defaultTime: state.defaultTime,
    isStarted: state.isStarted,
    setTime: state.setTime,
  }));
  const countdownAudio = useAudio(countdownSound);
  const currentTask = getTask(
    (task) => task.status === TASK_STATUS_VALUE.FOLLOW
  );

  const updateInvertedTime = () => {
    if (currentTask === undefined) return;
    currentTask.investedTime += 1000;
    updateTask(currentTask);
  };

  useEffect(() => {
    if (!started) return;

    if (time === 0 && isStarted) return startNext();

    if (time === 1000 * 5) countdownAudio.play();

    const intervalId = setInterval(() => {
      setTime(time - 1000);
      defaultTime === POMODORO_STATUS[0].timeAmount && updateInvertedTime();
    }, 1000);
    return () => clearInterval(intervalId);
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
