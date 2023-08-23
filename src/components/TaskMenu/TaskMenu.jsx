import React, { useId, useState } from "react";
import classes from "./TaskMenu.module.css";
import TaskButton from "../ui/TaskButton/TaskButton";
import Button from "../ui/Button/Button";
import { TASK_STATUS, TASK_STATUS_VALUE } from "../../constants/task-status";
import DropDownElement from "../ui/DropDownElement/DropDownElement";
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
                  changeFilterHandler(status.value);
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
