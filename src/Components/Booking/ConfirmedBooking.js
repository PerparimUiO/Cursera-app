import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./ConfirmedBooking.module.css";

const ConfirmedBooking = (props) => {
  const [redirectTimer, setRedirectTimer] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectTimer((state) => state - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
      if (redirectTimer <= 1) {
        props.navigate("/", { replace: true });
      }
    };
  });

  return (
    <div className={classes.container}>
      <p className={classes.msg}>
        Congratulations, Your booking has been confirmed
      </p>
      <p className={classes["redirect-msg"]}>
        <Link className={classes.link} to="/">
          click here
        </Link>{" "}
        {`to get redirected to the homepage, or you will be redirected
        automatically after ${redirectTimer} ${
          redirectTimer > 1 ? "seconds" : "second"
        }.`}
      </p>
    </div>
  );
};

export default ConfirmedBooking;
