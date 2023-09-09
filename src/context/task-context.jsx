import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import { TASK_ACTIONS } from "../constants/task-actions";
import { TASK_STATUS_VALUE } from "../constants/task-status";
import taskReducer, { initialState } from "../features/taskReducer";
import useLocalStorage from "../hooks/use-local-storage";

export const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [persistTasks, setPersistTasks] = useLocalStorage("persist:task", []);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const initializeTask = () => {
    dispatch({
      type: TASK_ACTIONS.SET_TASK_FROM_MEMORY,
      payload: { ...state, tasks: persistTasks },
    });
  };

  const changeFilter = (filterValue) => {
    dispatch({
      type: TASK_ACTIONS.CHANGE_FILTER,
      payload: {
        filter: filterValue,
      },
    });
  };

  const getTask = (condition) => {
    return state.tasks.find((task) => condition(task));
  };

  const addTask = (taskValue) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskValue,
      status: TASK_STATUS_VALUE.PENDING,
      investedTime: 0,
    };

    const updatedTasks = state.tasks.concat(newTask);
    dispatch({
      type: TASK_ACTIONS.ADD_TASK,
      payload: {
        tasks: updatedTasks,
      },
    });
  };

  const changeStatus = (task, status) => {
    let followTask = getTask(
      (task) => task.status === TASK_STATUS_VALUE.FOLLOW
    );

    let currentTasks = state.tasks;

    if (followTask !== undefined) {
      currentTasks = state.tasks.map((currentTask) =>
        currentTask.status === TASK_STATUS_VALUE.FOLLOW
          ? { ...currentTask, status: TASK_STATUS_VALUE.PENDING }
          : currentTask
      );
    }

    let updatedTask = currentTasks.map((currentTask) =>
      currentTask.id === task.id
        ? { ...currentTask, status: status }
        : currentTask
    );

    dispatch({
      type: TASK_ACTIONS.CHANGE_STATUS,
      payload: { tasks: updatedTask },
    });
  };

  const updateTask = (task) => {
    const updatedTasks = state.tasks.map((currentTask) =>
      currentTask.id === task.id ? task : currentTask
    );

    dispatch({
      type: TASK_ACTIONS.UPDATE_TASK,
      payload: { tasks: updatedTasks },
    });
  };

  const removeTask = (task) => {
    const updatedTasks = state.tasks.filter(
      (currentTask) => currentTask.id !== task.id
    );
    dispatch({
      type: TASK_ACTIONS.REMOVE_TASK,
      payload: {
        tasks: updatedTasks,
      },
    });
  };

  useEffect(() => {
    initializeTask();
  }, []);

  useEffect(() => {
    if (JSON.stringify(persistTasks) !== JSON.stringify(state.tasks)) {
      setPersistTasks(state.tasks);
    }
  }, [state.tasks]);

  const value = {
    tasks: state.tasks,
    filter: state.filter,
    addTaskHandler: addTask,
    updateTaskHandler: updateTask,
    removeTaskHandler: removeTask,
    initializeTask,
    getTask,
    changeStatus,
    changeFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("useTask must be used within TaskProvider");
  return context;
};
