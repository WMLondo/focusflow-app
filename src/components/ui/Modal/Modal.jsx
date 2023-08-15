import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: "0",
  },
  visible: {
    y: "0",
    opacity: "1",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 50,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: "0",
  },
};

const Modal = (props) => {
  const { children, open, click } = props;

  if (!open) return null;

  return createPortal(
    <motion.div
      className={classes.backdrop}
      onClick={click}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      end={{ opacity: 0 }}
    >
      <motion.div
        className={classes.container}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById("overlay-root")
  );
};

Modal.Header = (props) => {
  return <div className={classes.header}>{props.children}</div>;
};

Modal.Title = (props) => {
  return <h2 className={classes.title}>{props.children}</h2>;
};

Modal.Textarea = (props) => {
  const blurEnterMobileHandler = (e) => {
    if (e.key === "Enter") return e.target.blur();
  };

  return (
    <textarea
      className={classes.textarea}
      type="text"
      id={crypto.randomUUID()}
      maxLength="160"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.change}
      onKeyDown={blurEnterMobileHandler}
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
