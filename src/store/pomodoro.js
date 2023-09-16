import { create } from "zustand";
import { taskSlice } from "./slices/taskSlice";

export const usePomodoro = create((...a) => ({
  ...taskSlice(...a),
}));
