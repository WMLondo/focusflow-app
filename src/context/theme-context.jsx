import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import { LAYOUT_THEME } from "../constants/configuration";

const initialState = LAYOUT_THEME.LIGHT;

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("persist:theme", initialState);

  const toggleMode = () => {
    const newTheme =
      theme === LAYOUT_THEME.LIGHT ? LAYOUT_THEME.DARK : LAYOUT_THEME.LIGHT;
    setTheme(newTheme);
  };

  const value = {
    theme: theme,
    toggleHandler: toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("useTask must be used within ThemeProvider");
  return context;
};
