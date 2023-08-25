import {
  LONG_REST_FONT_COLOR,
  POMODORO_FONT_COLOR,
  REST_FONT_COLOR,
} from "./configuration";

export const POMODORO_STATUS = [
  {
    id: crypto.randomUUID(),
    title: "POMODORO",
    fontColor: POMODORO_FONT_COLOR,
    timeAmount: 1000 * 60 * 25,
  },
  {
    id: crypto.randomUUID(),
    title: "REST",
    fontColor: REST_FONT_COLOR,
    timeAmount: 1000 * 60 * 5,
  },
  {
    id: crypto.randomUUID(),
    title: "LONG REST",
    fontColor: LONG_REST_FONT_COLOR,
    timeAmount: 1000 * 60 * 15,
  },
];
