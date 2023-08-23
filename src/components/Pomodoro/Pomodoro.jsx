import React, { useEffect, useState } from "react";
import Timer from "../ui/Timer/Timer";
import Button from "../ui/Button/Button";
import classes from "./Pomodoro.module.css";
import StatusTitle from "../ui/StatusTitle/StatusTitle";
import { MdRestore, MdSkipNext } from "react-icons/md";
import { POMODORO_STATUS } from "../../constants/pomodoro-status";
import { useLocalStorage } from "../../hooks/use-local-storage";
import Modal from "../ui/Modal/Modal";
import { useTask } from "../../context/task-context";
import { TASK_STATUS_VALUE } from "../../constants/task-status";
import useAudio from "../../hooks/use-audio";
import clickSound from "../../assets/audio/click-sound/2e27afee-350b-4e6f-bcbb-920018b752b4.mp3";
import { formatTime } from "../../utils/format-time";

const Pomodoro = () => {
  const { getTask, changeTaskStatusHandler } = useTask();
  const audio = useAudio(clickSound);
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

  const toggleTimerHandler = () => {
    setStart((prevState) => !prevState);
    audio.play();
  };

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
    if (start) audio.play();
    setStart(false);
  }, [task]);

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
        <Modal.Header>
          <Modal.CloseButton
            click={() => {
              setModalIsOpen(false);
            }}
          />
          <Modal.Title>Did you complete this tasks?</Modal.Title>
        </Modal.Header>
        <Modal.Result>{task && task.title}</Modal.Result>
        <Modal.Tag value={` ${task && formatTime(task.investedTime)} mins`}>
          Curren Time Invested:
        </Modal.Tag>
        <Modal.PrimaryButton click={closeTaskHandler}>YES</Modal.PrimaryButton>
        <Modal.SecondaryButton
          click={() => {
            setModalIsOpen(false);
          }}
        >
          I'm Still Working
        </Modal.SecondaryButton>
      </Modal>
      {POMODORO_STATUS.slice(currentIndex, currentIndex + 1).map((status) => {
        return (
          <section
            className={classes.container}
            key={status.id}
            style={{
              backgroundColor: status.backgroundColor,
              boxShadow: `${
                start ? "0px 0px 10px 4px rgba(0, 0, 0, 0.25) inset" : ""
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
