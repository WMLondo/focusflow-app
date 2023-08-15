import React, { memo } from "react";
import classes from "./BackgroundVideo.module.css";

const BackgroundVideo = ({ video }) => {
  return (
    <>
      <video
        className={classes["background-video"]}
        autoPlay
        loop
        muted
        src={video}
      />
    </>
  );
};

export default memo(BackgroundVideo);
