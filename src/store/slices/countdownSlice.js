export const countdownSlice = (set, get) => ({
  started: false,
  time: 0,
  defaultTime: 0,
  isStarted: false,
  start: () => {
    set(() => ({
      started: true,
      isStarted: true,
    }));
  },
  pause: () => {
    set(() => ({
      started: false,
    }));
  },
  restart: () => {
    const { defaultTime } = get();
    set(() => ({
      started: false,
      isStarted: false,
      time: defaultTime,
      defaultTime,
    }));
  },
  setInitialTime: (timeValue) => {
    set(() => ({
      started: false,
      isStarted: false,
      defaultTime: timeValue,
      time: timeValue,
    }));
  },
  setTime: (timeValue) => {
    set(() => ({
      time: timeValue,
    }));
  },
});
