import { createContext, useCallback, useContext, useMemo } from "react";
import { LAYOUT_THEME } from "../constants/configuration";
import useLocalStorage from "../hooks/use-local-storage";

const initialState = LAYOUT_THEME.LIGHT;

const ThemeContext = createContext(initialState);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("persist:theme", initialState);

  const toggleMode = useCallback(() => {
    const newTheme =
      theme === LAYOUT_THEME.LIGHT ? LAYOUT_THEME.DARK : LAYOUT_THEME.LIGHT;
    setTheme(newTheme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme: theme,
      toggleHandler: toggleMode,
    }),
    [theme, toggleMode]
  );

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
