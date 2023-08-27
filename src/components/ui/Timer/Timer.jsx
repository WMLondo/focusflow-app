import React, { useEffect } from "react";
import classes from "./Timer.module.css";
import { useTask } from "../../../context/task-context";
import { formatTime } from "../../../utils/format-time";
import { Title } from "react-head";
import { APP_TITLE } from "../../../constants/configuration";
import { POMODORO_STATUS } from "../../../constants/pomodoro-status";
import { useCountdown } from "../../../context/countdown-context";
import countdownSound from "../.../../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import useAudio from "../../../hooks/use-audio";

const Timer = (props) => {
  const { start, time, variant, startNext } = props;
  const { getTask, updateTaskHandler } = useTask();
  const { countdownValues, setTime } = useCountdown();
  const countdownAudio = useAudio(countdownSound);

  const currentTask = getTask((task) => task.status === POMODORO_STATUS.FOLLOW);

  const updateInvertedTime = () => {
    if (currentTask === undefined) return;
    currentTask.investedTime += 1000;
    updateTaskHandler(currentTask);
  };

  let titleFormatted = `${formatTime(time)} | ${APP_TITLE.POMODORO}`;

  useEffect(() => {
    if (!start) return;

    if (time === 0 && countdownValues.isStarted) return startNext();

    if (time === 1000 * 5) countdownAudio.play();

    const intervalId = setInterval(() => {
      setTime(time - 1000);
      updateInvertedTime();
      if (time !== POMODORO_STATUS[0].timeAmount)
        titleFormatted = formatTime(time) + "|" + APP_TITLE.REST;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time, start]);

  return (
    <>
      <Title>{titleFormatted}</Title>
      <span className={classes.pomodoroClock} style={variant}>
        {formatTime(time)}
      </span>
    </>
  );
};

export default Timer;
