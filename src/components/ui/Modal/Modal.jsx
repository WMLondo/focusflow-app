import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 50,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
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
      transition={{ duration: 1 }}
    >
      <motion.div
        className={classes.modal}
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
  return <header className={classes.header}>{props.children}</header>;
};

Modal.Title = (props) => {
  return <h2 className={classes.title}>{props.children}</h2>;
};

Modal.Result = (props) => {
  return <span className={classes.result}>{props.children}</span>;
};

Modal.Tag = (props) => {
  return (
    <p className={classes.tag}>
      {props.children}
      <span>{props.value}</span>
    </p>
  );
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

Modal.PrimaryButton = (props) => {
  return (
    <motion.button
      className={classes["primary-button"]}
      onClick={props.click}
      whileHover={{
        scale: 1.03,
      }}
    >
      {props.children}
    </motion.button>
  );
};

Modal.SecondaryButton = (props) => {
  return (
    <motion.button
      className={classes["secondary-button"]}
      onClick={props.click}
      whileHover={{
        scale: 1.03,
      }}
    >
      {props.children}
    </motion.button>
  );
};

Modal.CloseButton = (props) => {
  return <IoClose onClick={props.click} className={classes.exit} />;
};

export default Modal;
