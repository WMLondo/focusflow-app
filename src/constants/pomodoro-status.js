export const POMODORO_STATUS = [
  {
    id: crypto.randomUUID(),
    title: "POMODORO",
    backgroundColor: "var(--secondary-color)",
    timeAmount: 1000 * 60 * 25,
  },
  {
    id: crypto.randomUUID(),
    title: "REST",
    backgroundColor: "var(--rest-color)",
    timeAmount: 1000 * 60 * 5,
  },
  {
    id: crypto.randomUUID(),
    title: "LONG REST",
    backgroundColor: "var(--long-rest-color)",
    timeAmount: 1000 * 60 * 15,
  },
];
