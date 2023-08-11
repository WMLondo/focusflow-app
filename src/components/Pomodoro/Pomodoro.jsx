import React, { useEffect, useState } from "react";
import Timer from "../ui/Timer/Timer";
import Button from "../ui/Button/Button";
import classes from "./Pomodoro.module.css";
import StatusTitle from "../ui/StatusTitle/StatusTitle";
import { MdRestore, MdSkipNext } from "react-icons/md";
import { POMODORO_STATUS } from "../../constants/pomodoro-status";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Modal from "../ui/Modal/Modal";
import { useTask } from "../../context/task-context";
import { TASK_STATUS_VALUE } from "../../constants/task-status";

const Pomodoro = () => {
  const { getTask, changeTaskStatusHandler } = useTask();
  const [start, setStart] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [restart, setRestart] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pomodoroCycle, setPomodoroCycle] = useLocalStorage(
    "persist:pomodoro",
    0
  );

  const task = getTask((currentTask) => {
    return currentTask.status === TASK_STATUS_VALUE.FOLLOW;
  });

  const closeTaskHandler = () => {
    changeTaskStatusHandler(task, TASK_STATUS_VALUE.COMPLETE);
    setModalIsOpen(false);
  };

  const cleanStartHandler = () => {
    setStart(false);
    setIsStarted((prevState) => !prevState);
  };

  const restoreStatusHandler = () => {
    cleanStartHandler();
    setCurrentIndex((prevState) => prevState);
    setRestart((prevState) => !prevState);
  };

  const nextStatusHandler = () => {
    cleanStartHandler();
    if (currentIndex === POMODORO_STATUS.length - 1) {
      setPomodoroCycle(0);
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prevState) => prevState + 1);
    switch (currentIndex) {
      case 0:
        setPomodoroCycle((prevState) => prevState + 1);
        break;
      case 1:
        setCurrentIndex(0);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (start) setIsStarted(true);
  }, [start]);

  useEffect(() => {
    if (pomodoroCycle > 3) {
      setCurrentIndex(POMODORO_STATUS.length - 1);
      task !== undefined && setModalIsOpen(true);
      return;
    }
  }, [pomodoroCycle]);

  return (
    <>
      <Modal
        open={modalIsOpen}
        click={() => {
          setModalIsOpen(false);
        }}
      >
        <Modal.CloseButton
          click={() => {
            setModalIsOpen(false);
          }}
        />
        <Modal.Title>Did you complete this tasks?</Modal.Title>
        <Modal.ConfirmationButton click={closeTaskHandler}>
          YES
        </Modal.ConfirmationButton>
        <Modal.BackButton
          click={() => {
            setModalIsOpen(false);
          }}
        >
          I'm Still Working
        </Modal.BackButton>
      </Modal>
      {POMODORO_STATUS.slice(currentIndex, currentIndex + 1).map((status) => {
        return (
          <div
            className={classes.container}
            key={status.id}
            style={{
              backgroundColor: status.backgroundColor,
              boxShadow: `${
                isStarted ? "0px 0px 10px 4px rgba(0, 0, 0, 0.25) inset" : ""
              }`,
            }}
          >
            <StatusTitle>{status.title}</StatusTitle>
            <Timer
              countdown={status.timeAmount}
              start={start}
              timerReset={restart}
              startNext={nextStatusHandler}
            />
            <div className={classes.action}>
              {isStarted && (
                <MdRestore
                  onClick={restoreStatusHandler}
                  className={classes["icon-button"]}
                />
              )}
              <Button
                variant={{
                  backgroundColor: `${start ? "var(--primary-color-200)" : ""}`,
                }}
                click={() => {
                  setStart((prevState) => !prevState);
                }}
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
          </div>
        );
      })}
    </>
  );
};

export default Pomodoro;
