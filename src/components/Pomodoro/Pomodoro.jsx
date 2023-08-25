import React, { useEffect, useState } from "react";
import Timer from "../ui/Timer/Timer";
import Button from "../ui/Button/Button";
import classes from "./Pomodoro.module.css";
import StatusTitle from "../ui/StatusTitle/StatusTitle";
import { MdRestore, MdSkipNext } from "react-icons/md";
import { POMODORO_STATUS } from "../../constants/pomodoro-status";
import Modal from "../ui/Modal/Modal";
import { useTask } from "../../context/task-context";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import useAudio from "../../hooks/use-audio";
import clickSound from "../../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import { formatTime } from "../../utils/format-time";
import { usePomodoro } from "../../context/pomodoro-context";
import { CLOCK_STAGE, POMODORO_CICLE } from "../../constants/configuration";

const Pomodoro = () => {
  const audio = useAudio(clickSound);
  const { getTask, changeStatus } = useTask();
  const { pomodoro, resetPomodoro, increasePomodoroHandler } = usePomodoro();
  const [start, setStart] = useState(false);
  const [currentStage, setCurrentStage] = useState(CLOCK_STAGE.POMODORO);
  const [restart, setRestart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let isStarted = start;

  const task = getTask((currentTask) => {
    return currentTask.status === TASK_STATUS_VALUE.FOLLOW;
  });

  const toggleModalHandler = (value) => {
    setIsModalOpen((prev) => value || !prev);
  };

  const toggleTimerHandler = () => {
    setStart((prevState) => !prevState);
    audio.play();
  };

  const closeTaskHandler = () => {
    changeStatus(task, TASK_STATUS_VALUE.COMPLETE);
    toggleModalHandler();
  };

  const cleanStartHandler = () => {
    setStart(false);
    isStarted = start;
  };

  const restoreHandler = () => {
    cleanStartHandler();
    setRestart((prev) => !prev);
  };

  const nextStatusHandler = () => {
    cleanStartHandler();
    switch (currentStage) {
      case CLOCK_STAGE.POMODORO:
        increasePomodoroHandler();
        setCurrentStage(
          pomodoro < POMODORO_CICLE ? CLOCK_STAGE.REST : CLOCK_STAGE.LONG_REST
        );
        break;
      case CLOCK_STAGE.REST:
        setCurrentStage(CLOCK_STAGE.POMODORO);
        break;
      default:
        setCurrentStage(CLOCK_STAGE.POMODORO);
        resetPomodoro();
    }
  };

  useEffect(() => {
    if (start) audio.play();
    setStart((prev) => !prev);
  }, [task]);

  useEffect(() => {
    if (start) isStarted = start;
  }, [start]);

  useEffect(() => {
    if (pomodoro === 1) {
      restoreHandler();
      setCurrentStage(CLOCK_STAGE.POMODORO);
      return;
    }

    if (pomodoro > POMODORO_CICLE) {
      task !== undefined && toggleModalHandler();
      return;
    }
  }, [pomodoro]);

  return (
    <>
      <Modal open={isModalOpen} click={() => toggleModalHandler(false)}>
        <Modal.Header>
          <Modal.CloseButton click={() => toggleModalHandler(false)} />
          <Modal.Title>Did you complete this tasks?</Modal.Title>
        </Modal.Header>
        <Modal.Result>{task && task.title}</Modal.Result>
        <Modal.Tag value={` ${task && formatTime(task.investedTime)} mins`}>
          Current Time Invested:
        </Modal.Tag>
        <Modal.PrimaryButton click={closeTaskHandler}>YES</Modal.PrimaryButton>
        <Modal.SecondaryButton click={() => toggleModalHandler(false)}>
          I'm Still Working
        </Modal.SecondaryButton>
      </Modal>
      {POMODORO_STATUS.slice(currentStage, currentStage + 1).map((status) => {
        return (
          <section
            className={classes.container}
            key={status.id}
            style={{
              boxShadow: `${
                start ? "0px 0px 10px 4px rgba(0, 0, 0, 0.25) inset" : ""
              }`,
            }}
          >
            <StatusTitle variant={{ color: status.fontColor }}>
              {status.title}
            </StatusTitle>
            <Timer
              countdown={status.timeAmount}
              start={start}
              timerReset={restart}
              startNext={nextStatusHandler}
              variant={{ color: status.fontColor }}
            />
            <div className={classes.action}>
              {isStarted && (
                <MdRestore
                  onClick={restoreHandler}
                  className={classes["icon-button"]}
                />
              )}
              <Button
                variant={{
                  backgroundColor: `${start ? "var(--primary-color-200)" : ""}`,
                }}
                click={toggleTimerHandler}
              >
                {start ? "PAUSE" : "START"}
              </Button>
              {isStarted && (
                <MdSkipNext
                  onClick={nextStatusHandler}
                  className={classes["icon-button"]}
                />
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Pomodoro;
