import { TASK_STATUS_VALUE } from "../../constants/task-status";

export const taskSlice = (set, get) => ({
  tasks: [],
  filter: "",

  getTask: (condition) => {
    const { tasks } = get();
    return tasks.find((task) => condition(task));
  },
  addTask: (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      status: TASK_STATUS_VALUE.PENDING,
      investedTime: 0,
    };
    const { tasks } = get();
    const updatedTasks = tasks.concat(newTask);
    set(() => ({ tasks: updatedTasks }));
  },
  updateTask: (task) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((currentTask) =>
      currentTask.id === task.id ? task : currentTask
    );
    set(() => ({ tasks: updatedTasks }));
  },
  removeTask: (task) => {
    const { tasks } = get();
    const updatedTasks = tasks.filter(
      (currentTask) => currentTask.id !== task.id
    );
    set(() => ({ tasks: updatedTasks }));
  },
  changeFollowStatus: (task) => {
    const { tasks } = get();

    const taskWithFollow = tasks.find(
      (currentTask) => currentTask.status === TASK_STATUS_VALUE.FOLLOW
    );

    let updateTask = tasks;

    if (taskWithFollow !== undefined) {
      updateTask = updateTask.map((currentTask) =>
        currentTask.id === taskWithFollow.id
          ? { ...taskWithFollow, status: TASK_STATUS_VALUE.PENDING }
          : currentTask
      );
    }
    updateTask = updateTask.map((currentTask) =>
      currentTask.id === task.id
        ? { ...task, status: TASK_STATUS_VALUE.FOLLOW }
        : currentTask
    );
    set(() => ({ tasks: updateTask }));
  },
  changeFilter: (filter) => {
    set(() => ({ filter }));
  },
});
