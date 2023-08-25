import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import { POMODORO_AMOUNT_INCREMENT } from "../constants/configuration";

const initialState = 0;

const PomodoroContext = createContext(initialState);

export const PomodoroProvider = ({ children }) => {
  const [pomodoro, setPomodoro] = useLocalStorage(
    "persist:pomodoro",
    initialState
  );

  const resetPomodoro = () => {
    setPomodoro(initialState);
  };

  const increasePomodoro = () => {
    setPomodoro((prevState) => prevState + POMODORO_AMOUNT_INCREMENT);
  };
  const value = {
    pomodoro: pomodoro,
    resetPomodoro: resetPomodoro,
    increasePomodoroHandler: increasePomodoro,
  };
  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined)
    throw new Error("useTask must be used within TaskProvider");
  return context;
};
