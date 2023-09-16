import { create } from "zustand";
import { taskSlice } from "./slices/taskSlice";
import { countdownSlice } from "./slices/countdownSlice";

export const usePomodoro = create((...a) => ({
  ...taskSlice(...a),
  ...countdownSlice(...a),
}));
