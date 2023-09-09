import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import clickSound from "../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import { COUNTDOWN_ACTIONS } from "../constants/countdown-actions";
import countdownReducer, { initialState } from "../features/countdownReducer";
import useAudio from "../hooks/use-audio";

const CountdownContext = createContext(initialState);

export const CountdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countdownReducer, initialState);
  const buttonSound = useAudio(clickSound);

  const startHandler = useCallback(
    (props = { withAudio: false }) => {
      if (props.withAudio) buttonSound.play();
      dispatch({
        type: COUNTDOWN_ACTIONS.START,
        payload: { ...state, started: true, isStarted: true },
      });
    },
    [state, buttonSound]
  );

  const pauseHandler = useCallback(
    (props = { withAudio: false }) => {
      if (props.withAudio) buttonSound.play();
      dispatch({
        type: COUNTDOWN_ACTIONS.START,
        payload: { ...state, started: false },
      });
    },
    [state, buttonSound]
  );

  const restartHandler = useCallback(() => {
    dispatch({
      type: COUNTDOWN_ACTIONS.RESTART,
      payload: { time: state.defaultTime },
    });
  }, [state]);

  const setInitialTimeHandler = useCallback(
    (timeValue) => {
      dispatch({
        type: COUNTDOWN_ACTIONS.CHANGE_COUNTDOWN,
        payload: {
          isStarted: false,
          started: false,
          time: timeValue,
          defaultTime: timeValue,
        },
      });
    },
    [state]
  );

  const setTimeHandler = useCallback(
    (timeValue) => {
      dispatch({
        type: COUNTDOWN_ACTIONS.SET_TIME,
        payload: {
          ...state,
          time: timeValue,
        },
      });
    },
    [state]
  );

  const value = useMemo(
    () => ({
      countdownValues: state,
      start: startHandler,
      pause: pauseHandler,
      restart: restartHandler,
      setInitialTime: setInitialTimeHandler,
      setTime: setTimeHandler,
    }),
    [
      state,
      startHandler,
      pauseHandler,
      restartHandler,
      setInitialTimeHandler,
      setTimeHandler,
    ]
  );

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
