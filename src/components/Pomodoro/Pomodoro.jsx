import React, { useEffect, useState } from "react";
import { MdRestore, MdSkipNext } from "react-icons/md";
import clickSound from "../../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import { CLOCK_STAGE, POMODORO_CICLE } from "../../constants/configuration";
import { POMODORO_STATUS } from "../../constants/pomodoro-status";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import useAudio from "../../hooks/use-audio";
import { usePomodoro } from "../../store/pomodoro";
import { formatTime } from "../../utils/format-time";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import StatusTitle from "../ui/StatusTitle/StatusTitle";
import Timer from "../ui/Timer/Timer";
import classes from "./Pomodoro.module.css";

const Pomodoro = () => {
  const clickSoundRef = useAudio(clickSound);
  const getTask = usePomodoro((state) => state.getTask);
  const started = usePomodoro((state) => state.started);
  const isStarted = usePomodoro((state) => state.isStarted);
  const start = usePomodoro((state) => state.start);
  const pause = usePomodoro((state) => state.pause);
  const restart = usePomodoro((state) => state.restart);
  const updateTask = usePomodoro((state) => state.updateTask);
  const setInitialTime = usePomodoro((state) => state.setInitialTime);
  const pomodoroIndex = usePomodoro((state) => state.pomodoroIndex);
  const resetPomodoro = usePomodoro((state) => state.resetPomodoro);
  const increasePomodoro = usePomodoro((state) => state.increasePomodoro);
  const [currentStage, setCurrentStage] = useState(CLOCK_STAGE.POMODORO);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const task = getTask((currentTask) => {
    return currentTask.status === TASK_STATUS_VALUE.FOLLOW;
  });

  const toggleButtonHandler = () => {
    clickSoundRef.play();
    started ? pause() : start();
  };

  const toggleModalHandler = (value) => {
    setIsModalOpen((prev) => value || !prev);
  };

  const closeTaskHandler = () => {
    const changedStatusTask = { ...task, status: TASK_STATUS_VALUE.COMPLETE };
    updateTask(changedStatusTask);
    toggleModalHandler();
  };

  const nextStatusHandler = () => {
    pause({ withAudio: true });
    switch (currentStage) {
      case CLOCK_STAGE.POMODORO:
        increasePomodoro();
        setCurrentStage(
          pomodoroIndex < POMODORO_CICLE - 1
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
    if (pomodoroIndex === 0) {
      setCurrentStage(CLOCK_STAGE.POMODORO);
      return;
    }

    if (pomodoroIndex >= POMODORO_CICLE) {
      task !== undefined && toggleModalHandler();
      return;
    }
  }, [pomodoroIndex]);

  const shadowEffect = {
    boxShadow: `${started ? "0px 0px 10px 4px rgba(0, 0, 0, 0.25) inset" : ""}`,
  };

  const backgroundEffect = {
    backgroundColor: `${started ? "var(--primary-color-200)" : ""}`,
  };

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
            style={shadowEffect}
          >
            <StatusTitle variant={{ color: status.fontColor }}>
              {status.title}
            </StatusTitle>
            <Timer
              startNext={nextStatusHandler}
              variant={{ color: status.fontColor }}
              {...{ isStarted, started }}
            />
            <div className={classes.action}>
              {isStarted && (
                <MdRestore
                  onClick={restart}
                  className={classes["icon-button"]}
                />
              )}
              <Button variant={backgroundEffect} click={toggleButtonHandler}>
                {started ? "PAUSE" : "START"}
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
