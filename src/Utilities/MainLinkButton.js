import { Link } from "react-router-dom";
import classes from "./MainLinkButton.module.css";

const MainButton = (props) => {
  return (
    <Link
      aria-label="on Click"
      to={props.link}
      className={classes.btn}
      disabled={props.disabled}
    >
      {props.text}
    </Link>
  );
};

export default MainButton;
