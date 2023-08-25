import React, { useState } from "react";
import classes from "./Toggle.module.css";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Toggle = (props) => {
  const { click, initialValue } = props;
  const [active, setActive] = useState(initialValue || false);

  const toggleHandler = () => {
    setActive((prevState) => !prevState);
    click();
  };
  return (
    <div
      className={classes.toggle}
      data-isactive={active}
      onClick={toggleHandler}
    >
      <motion.i className={classes.circle} layout transition={spring}>
        <span
          className={classes.emoji}
          role="img"
          aria-label={active ? "dark-mode" : "light-mode"}
          aria-hidden={false}
        >
          {active ? "🌙" : "☀️"}
        </span>
      </motion.i>
    </div>
  );
};

export default Toggle;
