import { createContext, useContext, useEffect } from "react";
import taskReducer, { initialState } from "../features/taskReducer";
import { useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
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
    };
    
    const updatedTasks = state.tasks.concat(newTask);
    dispatch({
      type: TASK_ACTIONS.ADD_TASK,
      payload: {
        tasks: updatedTasks,
      },
    });
  };

  const changeTaskStatus = (task, newStatus) => {
    let currentTasks = state.tasks;
    if (
      currentTasks.findIndex(
        (currentTask) => currentTask.status === TASK_STATUS_VALUE.FOLLOW
      ) >= 0
    ) {
      currentTasks = state.tasks.map((currentTask) =>
        currentTask.status === TASK_STATUS_VALUE.FOLLOW
          ? { ...currentTask, status: TASK_STATUS_VALUE.PENDING }
          : currentTask
      );
    }

    const updatedTasks = currentTasks.map((currentTask) =>
      currentTask.id === task.id
        ? { ...currentTask, status: newStatus }
        : currentTask
    );
    dispatch({
      type: TASK_ACTIONS.CHANGE_STATUS,
      payload: {
        tasks: updatedTasks,
      },
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
    changeFilterHandler: changeFilter,
    addTaskHandler: addTask,
    changeTaskStatusHandler: changeTaskStatus,
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
