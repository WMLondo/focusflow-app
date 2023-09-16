import React, { useId, useState } from "react";
import { TASK_STATUS } from "../../constants/task-status";
import { useCountdown } from "../../store/countdown-context";
import Button from "../ui/Button/Button";
import DropDownElement from "../ui/DropDownElement/DropDownElement";
import Modal from "../ui/Modal/Modal";
import TaskButton from "../ui/TaskButton/TaskButton";
import classes from "./TaskMenu.module.css";
import { usePomodoro } from "../../store/pomodoro";

const TaskMenu = () => {
  const { addTask, filter, changeFilter } = usePomodoro((state) => ({
    addTask: state.addTask,
    changeFilter: state.changeFilter,
    filter: state.filter,
  }));
  const [dropdown, setDropdown] = useState(false);
  const { countdownValues, start, pause } = useCountdown();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const modalId = useId();

  const closeHandler = () => {
    setInputValue("");
    setIsOpen(false);
    countdownValues.isStarted && start({ widthAudio: false });
  };
  const openHandler = () => {
    setIsOpen(true);
    countdownValues.started && pause({ widthAudio: false });
  };
  const handlerChange = (e) => setInputValue(e.target.value);

  const addHandler = () => {
    if (!inputValue || inputValue === "") return;
    addTask(inputValue);
    closeHandler();
  };

  const toggleDropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };
  return (
    <section className={classes.container}>
      <div className={classes.navbar}>
        <TaskButton click={toggleDropdownHandler}>
          {TASK_STATUS.find((taskStatus) => taskStatus.value === filter).title}
        </TaskButton>
        <ul
          style={{ display: `${dropdown ? "flex" : ""}` }}
          className={classes.dropdown}
          onClick={toggleDropdownHandler}
        >
          {TASK_STATUS.map((status) => {
            return (
              <DropDownElement
                click={() => {
                  changeFilter(status.value);
                }}
                key={status.id}
                value={status.value}
              >
                {status.title}
              </DropDownElement>
            );
          })}
        </ul>
      </div>
      <Button click={openHandler}>New Task</Button>
      <Modal click={closeHandler} open={isOpen} id={modalId}>
        <Modal.Header>
          <Modal.CloseButton click={closeHandler} />
          <Modal.Title>What are you working on?</Modal.Title>
        </Modal.Header>
        <Modal.Textarea
          placeholder="Plant the seed of your focus here, watch it grow into a task."
          value={inputValue}
          change={handlerChange}
        ></Modal.Textarea>
        <Modal.PrimaryButton click={addHandler}>ADD</Modal.PrimaryButton>
      </Modal>
    </section>
  );
};

export default TaskMenu;
