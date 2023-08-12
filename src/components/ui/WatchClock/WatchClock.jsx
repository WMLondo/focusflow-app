import React, { useEffect, useState } from "react";
import classes from "./WatchClock.module.css";

const WatchClock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return <span className={classes.clock}>{currentTime}</span>;
};

export default WatchClock;
