import { TASK_ACTIONS } from "../constants/task-actions";

export const initialState = {
  tasks: [],
  filter: "",
};

const taskReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: payload.tasks,
      };
    case TASK_ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        tasks: payload.tasks,
      };
    case TASK_ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: payload.tasks,
      };
    case TASK_ACTIONS.SET_TASK_FROM_MEMORY:
      return {
        ...state,
        tasks: payload.tasks,
      };
    case TASK_ACTIONS.CHANGE_FILTER:
      return {
        ...state,
        filter: payload.filter,
      };
    default:
      throw new Error("No action case implicit has been added.");
  }
};

export default taskReducer;
