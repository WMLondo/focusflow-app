export const TASK_STATUS_VALUE = {
  ALL: "",
  FOLLOW: "following",
  PENDING: "pending",
  COMPLETE: "complete",
};

export const TASK_STATUS = [
  { id: crypto.randomUUID(), title: "All Tasks", value: "" },
  {
    id: crypto.randomUUID(),
    title: "Following Task",
    value: TASK_STATUS_VALUE.FOLLOW,
  },
  {
    id: crypto.randomUUID(),
    title: "Incomplete Tasks",
    value: TASK_STATUS_VALUE.PENDING,
  },
  {
    id: crypto.randomUUID(),
    title: "Completed Tasks",
    value: TASK_STATUS_VALUE.COMPLETE,
  },
];
