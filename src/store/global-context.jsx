import { HeadProvider } from "react-head";
import { combineProvider } from "../utils/combineProvider";
import { PomodoroProvider } from "./pomodoro-context";

import { ThemeProvider } from "./theme-context";
import { CountdownProvider } from "./countdown-context";

const providers = [
  PomodoroProvider,
  ThemeProvider,
  HeadProvider,
  CountdownProvider,
];

export const GlobalProvider = combineProvider(...providers);
