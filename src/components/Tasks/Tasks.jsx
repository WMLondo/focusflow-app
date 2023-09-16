import React, { useEffect } from "react";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import useLocalStorage from "../../hooks/use-local-storage";
import { usePomodoro } from "../../store/pomodoro";
import Task from "../ui/Task/Task";
import classes from "./Tasks.module.css";
import clickSound from "../../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import useAudio from "../../hooks/use-audio";

const Tasks = () => {
  const {
    tasks,
    initializeTasks,
    filter,
    changeFollowStatus,
    removeTask,
    started,
    pause,
  } = usePomodoro((state) => ({
    tasks: state.tasks,
    filter: state.filter,
    removeTask: state.removeTask,
    initializeTasks: state.initializeTasks,
    changeFollowStatus: state.changeFollowStatus,
    started: state.started,
    pause: state.pause,
  }));
  const [localTasks, setLocalTasks] = useLocalStorage("persist:task", []);
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
