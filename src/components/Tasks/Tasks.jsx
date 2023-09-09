import React from "react";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import { useCountdown } from "../../context/countdown-context";
import { useTask } from "../../context/task-context";
import Task from "../ui/Task/Task";
import classes from "./Tasks.module.css";

const Tasks = () => {
  const { tasks, filter, changeStatus, removeTaskHandler } = useTask();
  const { countdownValues, pause } = useCountdown();
  let filteredTasks =
    filter !== ""
      ? tasks.filter((task) => task.status === filter)
      : tasks.filter((task) => task.status !== TASK_STATUS_VALUE.COMPLETE);

  const changeStatusHandler = (task) => {
    countdownValues.started && pause({ withAudio: true });
    if (task.status === TASK_STATUS_VALUE.FOLLOW) {
      return changeStatus(task, TASK_STATUS_VALUE.PENDING);
    }
    changeStatus(task, TASK_STATUS_VALUE.FOLLOW);
  };

  return (
    <section className={classes.container}>
      {filteredTasks.map((task) => {
        return (
          <Task key={task.id}>
            <Task.Title>{task.title}</Task.Title>
            <Task.Action>
              <Task.ExitButton click={() => removeTaskHandler(task)} />
              <Task.FollowButton
                click={() => changeStatusHandler(task)}
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
