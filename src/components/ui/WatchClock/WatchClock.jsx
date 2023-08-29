import React, { useEffect, useState } from "react";
import classes from "./WatchClock.module.css";

const WatchClock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "numeric",
        second: "numeric",
      })
    );
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "numeric",
          second: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return <span className={classes.clock}>{currentTime}</span>;
};

export default WatchClock;
