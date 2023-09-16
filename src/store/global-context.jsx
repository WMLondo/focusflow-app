import { HeadProvider } from "react-head";
import { combineProvider } from "../utils/combineProvider";
import { PomodoroProvider } from "./pomodoro-context";

import { ThemeProvider } from "./theme-context";

const providers = [PomodoroProvider, ThemeProvider, HeadProvider];

export const GlobalProvider = combineProvider(...providers);
