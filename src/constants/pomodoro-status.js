export const POMODORO_STATUS = [
  {
    id: crypto.randomUUID(),
    title: "POMODORO",
    fontColor: "var(--focus-color)",
    timeAmount: 1000 * 60 * 25,
  },
  {
    id: crypto.randomUUID(),
    title: "REST",
    fontColor: "var(--rest-color)",
    timeAmount: 1000 * 60 * 5,
  },
  {
    id: crypto.randomUUID(),
    title: "LONG REST",
    fontColor: "var(--long-rest-color)",
    timeAmount: 1000 * 60 * 15,
  },
];
