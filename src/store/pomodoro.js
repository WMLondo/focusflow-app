import { create } from "zustand";
import { taskSlice } from "./slices/taskSlice";
import { countdownSlice } from "./slices/countdownSlice";
import { pomodoroSlice } from "./slices/pomodoroSlice";
import { persist } from "zustand/middleware";

export const usePomodoro = create(
  persist(
    (...a) => ({
      ...taskSlice(...a),
      ...countdownSlice(...a),
      ...pomodoroSlice(...a),
    }),
    {
      name: "persist:pomodoro",
      partialize: (state) => ({
        tasks: state.tasks,
        pomodoroIndex: state.pomodoroIndex,
      }),
    }
  )
);
