import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";
import useAudio from "../../../hooks/useAudio";
import countdownAudio from "../../../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";

const Timer = (props) => {
  const { start, countdown, timerReset } = props;
  const [timer, setTimer] = useState(countdown);
  const audio = useAudio(countdownAudio);
  useEffect(() => {
    if (timer === 0) return props.startNext();

    if (timer === 1000 * 5) audio.play();

    if (!start) return;
    const intervalId = setInterval(() => {
      setTimer((prevState) => prevState - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, start]);

  useEffect(() => {
    setTimer(countdown);
  }, [timerReset, countdown]);

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
