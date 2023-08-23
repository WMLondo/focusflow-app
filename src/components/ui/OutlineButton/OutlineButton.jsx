import React from "react";
import classes from "./OutlineButton.module.css";
import { motion } from "framer-motion";

const OutlineButton = (props) => {
  return (
    <motion.button
      className={classes.button}
      style={props.variant}
      onClick={props.click}
      whileHover={{
        scale: 1.03,
      }}
    >
      {props.children}
    </motion.button>
  );
};

export default OutlineButton;
