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
import { formatTime } from "../../utils/format-time";
import { usePomodoro } from "../../context/pomodoro-context";
import { CLOCK_STAGE, POMODORO_CICLE } from "../../constants/configuration";
import { useCountdown } from "../../context/countdown-context";

const Pomodoro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(CLOCK_STAGE.POMODORO);
  const { getTask, changeStatus } = useTask();
  const { pomodoro, resetPomodoro, increasePomodoroHandler } = usePomodoro();
  const { countdownValues, start, pause, restart, setInitialTime } =
    useCountdown();

  const task = getTask((currentTask) => {
    return currentTask.status === TASK_STATUS_VALUE.FOLLOW;
  });

  const toggleModalHandler = (value) => {
    setIsModalOpen((prev) => value || !prev);
  };

  const closeTaskHandler = () => {
    changeStatus(task, TASK_STATUS_VALUE.COMPLETE);
    toggleModalHandler();
  };

  const nextStatusHandler = () => {
    pause({ withAudio: true });
    switch (currentStage) {
      case CLOCK_STAGE.POMODORO:
        increasePomodoroHandler();
        setCurrentStage(
          pomodoro < POMODORO_CICLE - 1
            ? CLOCK_STAGE.REST
            : CLOCK_STAGE.LONG_REST
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
    setInitialTime(POMODORO_STATUS[currentStage].timeAmount);
  }, [currentStage]);

  useEffect(() => {
    if (countdownValues.start) {
      pause({ withAudio: true });
    }
  }, [task]);

  useEffect(() => {
    if (pomodoro === 0) {
      setCurrentStage(CLOCK_STAGE.POMODORO);
      return;
    }

    if (pomodoro >= POMODORO_CICLE) {
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
              startNext={nextStatusHandler}
              variant={{ color: status.fontColor }}
              {...countdownValues}
            />
            <div className={classes.action}>
              {countdownValues.isStarted && (
                <MdRestore
                  onClick={restart}
                  className={classes["icon-button"]}
                />
              )}
              <Button
                variant={{
                  backgroundColor: `${start ? "var(--primary-color-200)" : ""}`,
                }}
                click={() => {
                  countdownValues.start
                    ? pause({ withAudio: true })
                    : start({ withAudio: true });
                }}
              >
                {countdownValues.start ? "PAUSE" : "START"}
              </Button>
              {countdownValues.isStarted && (
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
