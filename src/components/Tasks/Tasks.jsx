import React from "react";
import clickSound from "../../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import useAudio from "../../hooks/use-audio";
import { usePomodoro } from "../../store/pomodoro";
import Task from "../ui/Task/Task";
import classes from "./Tasks.module.css";

const Tasks = () => {
  const tasks = usePomodoro((state) => state.tasks);
  const filter = usePomodoro((state) => state.filter);
  const changeFollowStatus = usePomodoro((state) => state.changeFollowStatus);
  const removeTask = usePomodoro((state) => state.removeTask);
  const started = usePomodoro((state) => state.started);
  const pause = usePomodoro((state) => state.pause);
  const clickSoundRef = useAudio(clickSound);
  let filteredTasks =
    filter !== ""
      ? tasks.filter((task) => task.status === filter)
      : tasks.filter((task) => task.status !== TASK_STATUS_VALUE.COMPLETE);

  const changeFollowStatusHandler = (task) => {
    if (started) {
      clickSoundRef.play();
      pause();
    }
    changeFollowStatus(task);
  };

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
