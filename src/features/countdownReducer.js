import { COUNTDOWN_ACTIONS } from "../constants/countdown-actions";

export const initialState = {
  started: false,
  time: 0,
  defaultTime: 0,
  isStarted: false,
};

const countdownReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case COUNTDOWN_ACTIONS.START:
      return { ...payload };
    case COUNTDOWN_ACTIONS.PAUSE:
      return { ...payload };
    case COUNTDOWN_ACTIONS.RESTART:
      return {
        ...initialState,
        time: payload.time,
        defaultTime: state.defaultTime,
      };
    case COUNTDOWN_ACTIONS.CHANGE_COUNTDOWN:
      return { ...payload };
    case COUNTDOWN_ACTIONS.SET_TIME:
      return { ...payload };
    default:
      throw new Error("No action case implicit has been added.");
  }
};

export default countdownReducer;
