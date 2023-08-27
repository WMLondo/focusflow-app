import { createContext, useContext, useReducer, useEffect } from "react";
import countdownReducer, { initialState } from "../features/countdownReducer";
import { COUNTDOWN_ACTIONS } from "../constants/countdown-actions";
import clickSound from "../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import countdownSound from "../assets/audio/countdown/0fb2d523-9d92-4177-af4e-5260d6a42663.mp3";
import useAudio from "../hooks/use-audio";

const CountdownContext = createContext(initialState);

export const CountdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countdownReducer, initialState);
  const buttonSound = useAudio(clickSound);

  const startHandler = (props = { withAudio: false }) => {
    const { withAudio } = props;
    if (withAudio) buttonSound.play();
    const value = {
      ...state,
      start: true,
      isStarted: true,
    };
    dispatch({
      type: COUNTDOWN_ACTIONS.START,
      payload: value,
    });
  };

  const pauseHandler = (props = { withAudio: false }) => {
    const { withAudio } = props;
    if (withAudio) buttonSound.play();
    const value = {
      ...state,
      start: false,
    };
    dispatch({
      type: COUNTDOWN_ACTIONS.START,
      payload: value,
    });
  };

  const restartHandler = () => {
    dispatch({
      type: COUNTDOWN_ACTIONS.RESTART,
      payload: { time: state.defaultTime },
    });
  };

  const setInitialTimeHandler = (timeValue) => {
    dispatch({
      type: COUNTDOWN_ACTIONS.CHANGE_COUNTDOWN,
      payload: { ...state, time: timeValue, defaultTime: timeValue },
    });
  };

  const setTimeHandler = (timeValue) => {
    dispatch({
      type: COUNTDOWN_ACTIONS.SET_TIME,
      payload: { ...state, time: timeValue },
    });
  };

  const value = {
    countdownValues: state,
    start: startHandler,
    pause: pauseHandler,
    restart: restartHandler,
    setInitialTime: setInitialTimeHandler,
    setTime: setTimeHandler,
  };
  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdown = () => {
  const context = useContext(CountdownContext);

  if (context === undefined) {
    throw new Error("useTask must be used within TaskProvider");
  }

  return context;
};
