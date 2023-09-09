import React, { useEffect, useState } from "react";
import { usePageVisibility } from "../../../hooks/use-page-visibility";
import classes from "./WatchClock.module.css";

const WatchClock = () => {
  const [currentTime, setCurrentTime] = useState("");
  const isVisible = usePageVisibility();

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );

    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return <span className={classes.clock}>{currentTime}</span>;
};

export default WatchClock;
