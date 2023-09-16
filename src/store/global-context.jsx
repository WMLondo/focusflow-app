import { HeadProvider } from "react-head";
import { combineProvider } from "../utils/combineProvider";

import { ThemeProvider } from "./theme-context";

const providers = [ThemeProvider, HeadProvider];

export const GlobalProvider = combineProvider(...providers);
