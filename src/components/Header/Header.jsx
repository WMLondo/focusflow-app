import React from "react";
import AppTitle from "../ui/AppTitle/AppTitle";
import WatchClock from "../ui/WatchClock/WatchClock";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <AppTitle />
      <WatchClock />
    </header>
  );
};

export default Header;
