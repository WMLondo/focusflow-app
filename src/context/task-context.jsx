import { createContext, useContext, useEffect } from "react";
import taskReducer, { initialState } from "../features/taskReducer";
import { useReducer } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import { TASK_ACTIONS } from "../constants/task-actions";
import { TASK_STATUS_VALUE } from "../constants/task-status";

export const TaskContext = createContext(initialState);

export const TaskProvider = ({ children }) => {
  const [persistTasks, setPersistTasks] = useLocalStorage("persist:task", []);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const changeFilter = (filterValue) => {
    dispatch({
      type: TASK_ACTIONS.CHANGE_FILTER,
      payload: {
        filter: filterValue,
      },
    });
  };

  const getTask = (condition) => {
    return state.tasks.find((currentTask) => condition(currentTask));
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
    let followTaskIndex = state.tasks.findIndex(
      (currentTask) => currentTask.status === TASK_STATUS_VALUE.FOLLOW
    );

    let currentTasks = state.tasks;
    if (followTaskIndex >= 0) {
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
    const taskAmount = state.tasks.length;
    if (taskAmount < state.tasks) return;
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
    if (persistTasks && state === initialState) {
      dispatch({
        type: TASK_ACTIONS.SET_TASK_FROM_MEMORY,
        payload: {
          tasks: persistTasks,
        },
      });
      return;
    }
    setPersistTasks(state.tasks);
  }, [state.tasks]);

  const value = {
    tasks: state.tasks,
    getTask: getTask,
    filter: state.filter,
    changeStatus: changeStatus,
    changeFilterHandler: changeFilter,
    addTaskHandler: addTask,
    updateTaskHandler: updateTask,
    removeTaskHandler: removeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("useTask must be used within TaskProvider");
  return context;
};
