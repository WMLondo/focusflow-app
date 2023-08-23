import React, { useState } from "react";
import classes from "./Toggle.module.css";
import { motion } from "framer-motion";

const Toggle = (props) => {
  const { click, orientation, initialValue } = props;
  const [active, setActive] = useState(initialValue || false);

  const variant = {
    active: { translateX: "100%" },
    unactive: { translateX: 0 },
  };

  const toggleHandler = () => {
    setActive((prevState) => !prevState);
    click();
  };
  return (
    <span
      className={classes.toggle}
      style={orientation}
      onClick={toggleHandler}
    >
      <motion.i
        className={classes.circle}
        animate={active ? "active" : "unactive"}
        variants={variant}
      ></motion.i>
    </span>
  );
};

export default Toggle;
