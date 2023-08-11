import React from "react";
import AppTitle from "../ui/AppTitle/AppTitle";
import classes from "./Header.module.css";
import WatchClock from "../ui/WatchClock/WatchClock";

const Header = () => {
  return (
    <header className={classes.header}>
      <AppTitle />
      <WatchClock />
    </header>
  );
};

export default Header;
