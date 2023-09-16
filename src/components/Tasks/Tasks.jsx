import React from "react";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import { useCountdown } from "../../store/countdown-context";
import Task from "../ui/Task/Task";
import classes from "./Tasks.module.css";
import { usePomodoro } from "../../store/pomodoro";
import useLocalStorage from "../../hooks/use-local-storage";
import { useEffect } from "react";

const Tasks = () => {
  const {
    tasks,
    initializeTasks,
    filter,
    updateTask,
    changeFollowStatus,
    removeTask,
  } = usePomodoro((state) => ({
    tasks: state.tasks,
    filter: state.filter,
    updateTask: state.updateTask,
    removeTask: state.removeTask,
    initializeTasks: state.initializeTasks,
    changeFollowStatus: state.changeFollowStatus,
  }));
  const [localTasks, setLocalTasks] = useLocalStorage("persist:task", []);
  const { countdownValues, pause } = useCountdown();
  let filteredTasks =
    filter !== ""
      ? tasks.filter((task) => task.status === filter)
      : tasks.filter((task) => task.status !== TASK_STATUS_VALUE.COMPLETE);

  const changeFollowStatusHandler = (task) => {
    countdownValues.started && pause({ withAudio: true });
    changeFollowStatus(task);
  };

  useEffect(() => {
    initializeTasks(localTasks);
  }, []);

  useEffect(() => {
    const asyncSetLocalTask = async () => await setLocalTasks(tasks);
    asyncSetLocalTask();
  }, [tasks]);

  return (
    <section className={classes.container}>
      {filteredTasks.map((task) => {
        return (
          <Task key={task.id}>
            <Task.Title>{task.title}</Task.Title>
            <Task.Action>
              <Task.ExitButton click={() => removeTask(task)} />
              <Task.FollowButton
                click={() => changeFollowStatusHandler(task)}
                status={task.status === TASK_STATUS_VALUE.FOLLOW}
              >
                {task.status === TASK_STATUS_VALUE.FOLLOW
                  ? "FOLLOWING"
                  : "FOLLOW"}
              </Task.FollowButton>
            </Task.Action>
          </Task>
        );
      })}
    </section>
  );
};

export default Tasks;
