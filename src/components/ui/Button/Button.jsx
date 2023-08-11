import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      style={props.variant}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default Button;
