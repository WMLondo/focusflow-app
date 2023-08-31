import React, { useEffect, useState } from "react";
import classes from "./WatchClock.module.css";
import useDocumentVisibility from "../../../hooks/use-document-visibility";

const WatchClock = () => {
  const [currentTime, setCurrentTime] = useState("");
  const isVisible = useDocumentVisibility();

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
  }, [isVisible, currentTime]);
  return <span className={classes.clock}>{currentTime}</span>;
};

export default WatchClock;
