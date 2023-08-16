import React, { useId, useState } from "react";
import classes from "./TaskMenu.module.css";
import TaskButton from "../ui/TaskButton/TaskButton";
import Button from "../ui/Button/Button";
import { TASK_STATUS, TASK_STATUS_VALUE } from "../../constants/task-status";
import TaskOption from "../ui/TaskOption/TaskOption";
import { useTask } from "../../context/task-context";
import Modal from "../ui/Modal/Modal";

const TaskMenu = () => {
  const { addTaskHandler, filter, changeFilterHandler } = useTask();
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const modalId = useId();

  const closeHandler = () => {
    setInputValue("");
    setIsOpen(false);
  };
  const openHandler = () => {
    setIsOpen(true);
  };
  const handlerChange = (e) => setInputValue(e.target.value);

  const addHandler = () => {
    if (!inputValue || inputValue === "") return;
    addTaskHandler(inputValue);
    closeHandler();
  };

  const toggleDropdownHandler = () => {
    setDropdown((prevState) => !prevState);
  };
  return (
    <div className={classes.container}>
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
              <TaskOption
                click={() => {
                  changeFilterHandler(status.value);
                }}
                key={status.id}
                value={status.value}
              >
                {status.title}
              </TaskOption>
            );
          })}
        </ul>
      </div>
      <Button click={openHandler}>New Task</Button>
      <Modal click={closeHandler} open={isOpen} id={modalId}>
        <Modal.Header>
          <Modal.CloseButton click={closeHandler} />
        </Modal.Header>
        <Modal.Textarea
          placeholder="What are you working on?"
          value={inputValue}
          change={handlerChange}
        ></Modal.Textarea>
        <Modal.ConfirmationButton click={addHandler}>
          ADD
        </Modal.ConfirmationButton>
      </Modal>
    </div>
  );
};

export default TaskMenu;
