import { POMODORO_AMOUNT_INCREMENT } from "../../constants/configuration";

const initialIndex = 0;

export const pomodoroSlice = (set) => ({
  pomodoroIndex: initialIndex,
  increasePomodoro: () => {
    set((state) => ({
      pomodoroIndex: state.pomodoroIndex + POMODORO_AMOUNT_INCREMENT,
    }));
  },
  resetPomodoro: () => {
    set(() => ({ pomodoroIndex: initialIndex }));
  },
});
