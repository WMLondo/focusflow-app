import React, { memo, useEffect, useRef } from "react";
import { usePageVisibility } from "../../../hooks/use-page-visibility";
import classes from "./BackgroundVideo.module.css";

const BackgroundVideo = ({ video }) => {
  const isVisible = usePageVisibility();
  const videoRef = useRef();

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <video
      className={classes["background-video"]}
      autoPlay
      loop
      muted
      src={video}
      ref={videoRef}
    />
  );
};

export default memo(BackgroundVideo);
