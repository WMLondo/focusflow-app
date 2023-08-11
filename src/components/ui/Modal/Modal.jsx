import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

const Modal = (props) => {
  const { children, open, click } = props;

  if (!open) return null;

  return createPortal(
    <div className={classes.backdrop} onClick={click}>
      <div className={classes.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("overlay-root")
  );
};

Modal.Title = (props) => {
  return <h2 className={classes.title}>{props.children}</h2>;
};

Modal.Textarea = (props) => {
  return (
    <textarea
      className={classes.textarea}
      id={crypto.randomUUID()}
      maxLength="160"
      placeholder={props.placeholder}
      onChange={props.change}
    ></textarea>
  );
};

Modal.ConfirmationButton = (props) => {
  return (
    <button className={classes["confirmation-button"]} onClick={props.click}>
      {props.children}
    </button>
  );
};

Modal.BackButton = (props) => {
  return (
    <button className={classes["back-button"]} onClick={props.click}>
      {props.children}
    </button>
  );
};

Modal.CloseButton = (props) => {
  return <IoClose onClick={props.click} className={classes.exit} />;
};

export default Modal;
