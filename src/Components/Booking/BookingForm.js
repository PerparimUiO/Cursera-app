import { useEffect, useState, useContext } from "react";
import { AppStore } from "../../store/Context";
import MainBtn from "../../Utlities/MainBtn";
import { fetchAPI } from "./../../JavaScript API file/raw.githubusercontent.com_Meta-Front-End-Developer-PC_capstone_master_api";

import classes from "./BookingForm.module.css";

const date = new Date();

const minDate =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

const maxDate =
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 3).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0");

const BookingForm = (props) => {
  const [dateInput, setDateInput] = useState(minDate);
  const [timeSelect, setTimeSelect] = useState("");
  const [guestsInput, setGuestsInput] = useState("");
  const [occasionSelect, setOccasionSelect] = useState("");

  const [isDateValid, setIsDateValid] = useState(true);
  const [isTimeValid, setIsTimeValid] = useState(false);
  const [isGuestsValid, setIsGuestsValid] = useState(false);
  const [isOccasionValid, setIsOccasionValid] = useState(false);

  const [isTimeTouched, setisTimeTouched] = useState(false);
  const [isGuestsTouched, setisGuestsTouched] = useState(false);
  const [isOccasionTouched, setisOccasionTouched] = useState(false);

  const ctx = useContext(AppStore);

  const { setAvailableTimes } = props;

  useEffect(() => {
    const chosenDate = new Date(dateInput);
    const availableTimes = fetchAPI(chosenDate);
    setAvailableTimes(availableTimes);
  }, [dateInput, setAvailableTimes]);

  let isBtnDisabled = true;

  const dateInputHandler = (event) => {
    setDateInput(event.target.value);
    if (
      event.target.value !== "" &&
      event.target.value >= minDate &&
      event.target.value <= maxDate
    ) {
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  };

  const timeSelectHandler = (event) => {
    setTimeSelect(event.target.value);
    if (event.target.value) {
      setIsTimeValid(true);
      setisTimeTouched(true);
    } else {
      setIsTimeValid(false);
      setisTimeTouched(true);
    }
  };
  const guestsInputHandler = (event) => {
    setGuestsInput(event.target.value);
    if (
      event.target.value !== "" &&
      +event.target.value >= 1 &&
      +event.target.value <= 10
    ) {
      setIsGuestsValid(true);
      setisGuestsTouched(true);
    } else {
      setIsGuestsValid(false);
      setisGuestsTouched(true);
    }
  };
  const occasionSelectHandler = (event) => {
    setOccasionSelect(event.target.value);
    if (event.target.value) {
      setIsOccasionValid(true);
      setisOccasionTouched(true);
    } else {
      setIsOccasionValid(false);
      setisOccasionTouched(true);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const id = new Date().getMilliseconds().toString();

    setDateInput(minDate);
    setTimeSelect("");
    setGuestsInput("");
    setOccasionSelect("");

    const response = props.submitForm({
      id: id,
      dateInput,
      timeSelect,
      guestsInput,
      occasionSelect,
    });

    if (response) {
      ctx.addReservation({
        id: id,
        date: dateInput,
        time: timeSelect,
        guests: guestsInput,
        occasion: occasionSelect,
      });

      props.navigate(`confirmed/${id}`);
    }
  };

  if (isDateValid && isTimeValid && isGuestsValid && isOccasionValid) {
    isBtnDisabled = false;
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="res-date">Choose date</label>
        {!isDateValid && (
          <p>Please eneter a valid Date ( From today's up to a month ahead )</p>
        )}
        <input
          onChange={dateInputHandler}
          onBlur={dateInputHandler}
          value={dateInput}
          type="date"
          min={minDate}
          max={maxDate}
          id="res-date"
        />
      </div>
      <div>
        <label htmlFor="res-time">Choose time</label>
        {!isTimeValid && isTimeTouched && <p>Please Choose a time</p>}
        <select
          id="res-time"
          onChange={timeSelectHandler}
          onBlur={timeSelectHandler}
          value={timeSelect}
        >
          <option value="" disabled hidden>
            None
          </option>
          {props.availableTimes.map((time, i) => (
            <option key={i} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="guests">Number of guests</label>
        {!isGuestsValid && isGuestsTouched && (
          <p>Please enter a valid number( 1 - 10 )</p>
        )}
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          onChange={guestsInputHandler}
          onBlur={guestsInputHandler}
          value={guestsInput}
        />
      </div>
      <div>
        <label htmlFor="occasion">Occasion</label>
        {!isOccasionValid && isOccasionTouched && (
          <p>Please choose your occasion type</p>
        )}
        <select
          id="occasion"
          onChange={occasionSelectHandler}
          onBlur={occasionSelectHandler}
          value={occasionSelect}
        >
          <option value="" disabled hidden>
            None
          </option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
      </div>
      <MainBtn
        disabled={isBtnDisabled}
        type="submit"
        text="Make your Reservation"
      />
    </form>
  );
};

export default BookingForm;
