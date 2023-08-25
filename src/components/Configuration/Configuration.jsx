import React from "react";
import CicleValue from "../ui/CicleValue/CicleValue";
import Toggle from "../ui/Toggle/Toggle";
import classes from "./Configuration.module.css";
import { useTheme } from "../../context/theme-context";
import { LAYOUT_THEME } from "../../constants/configuration";
import { usePomodoro } from "../../context/pomodoro-context";
import { MdRestore } from "react-icons/md";

const Configuration = () => {
  const { theme, toggleHandler } = useTheme();
  const { pomodoro, resetPomodoro } = usePomodoro();

  return (
    <div className={classes.container}>
      <Toggle
        click={toggleHandler}
        initialValue={theme !== LAYOUT_THEME.LIGHT}
      />
      <div className={classes["tag-container"]}>
        <p className={classes.tag}>Ongoing Pomodoro: </p>
        <CicleValue currentPomodoro={pomodoro} />
        {pomodoro > 1 && (
          <MdRestore className={classes.restore} onClick={resetPomodoro} />
        )}
      </div>
    </div>
  );
};

export default Configuration;
