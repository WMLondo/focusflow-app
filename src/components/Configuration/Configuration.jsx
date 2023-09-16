import React from "react";
import { MdRestore } from "react-icons/md";
import { LAYOUT_THEME } from "../../constants/configuration";
import { usePomodoro } from "../../store/pomodoro";
import { useTheme } from "../../store/theme-context";
import CicleValue from "../ui/CicleValue/CicleValue";
import Toggle from "../ui/Toggle/Toggle";
import classes from "./Configuration.module.css";

const Configuration = () => {
  const { theme, toggleHandler } = useTheme();
  const pomodoroIndex = usePomodoro((state) => state.pomodoroIndex);
  const resetPomodoro = usePomodoro((state) => state.resetPomodoro);

  return (
    <div className={classes.container}>
      <Toggle
        click={toggleHandler}
        initialValue={theme !== LAYOUT_THEME.LIGHT}
      />
      <div className={classes["tag-container"]}>
        <p className={classes.tag}>Ongoing Pomodoro: </p>
        <CicleValue currentPomodoro={pomodoroIndex} />
        {pomodoroIndex > 0 && (
          <MdRestore className={classes.restore} onClick={resetPomodoro} />
        )}
      </div>
    </div>
  );
};

export default Configuration;
