import React, { useEffect, useState } from "react";
import "./personalInfo.scss";
import { MdMale, MdFemale } from "react-icons/md";
import { Button, Card } from "react-bootstrap";
import { GrAdd, GrSubtract } from "react-icons/gr";
import {
  NEXT,
  PERSONAL_INFO,
  INCREMENT,
  DECREMENT,
  MALE,
  FEMALE,
  MEAL_PLAN_STEPS,
  CHOOSE_YOUR_GENDER,
} from "../../utils/constants";
import {
  validateAndSetFeet,
  validateAndSetInches,
  validateAndSetWeight,
  validateWeightOnLongPress,
  validateAndSetAge,
} from "../../utils/handleValidations";
import MaleIcon from "../../assets/home/male.svg";
import FemaleIcon from "../../assets/home/female.svg";

let timer;
let touchduration = 800;
const {
  DEFAULT_MEN_FEET,
  DEFAULT_MEN_INCHES,
  DEFAULT_WOMEN_FEET,
  DEFAULT_WOMEN_INCHES,
  DEFAULT_MEN_WEIGHT,
  DEFAULT_WOMEN_WEIGHT,
  DEFAULT_AGE,
} = PERSONAL_INFO;

const PersonalInfo = ({
  handleBack,
  handleNextStep,
  defaultGender,
  onProfileDetailsSubmit,
}) => {
  const [gender, setGender] = useState(defaultGender);
  const [genderSelected, setGenderSelected] = useState(false);
  const [heightFeet, setHeightFeet] = useState(
    defaultGender === MALE ? DEFAULT_MEN_FEET : DEFAULT_WOMEN_FEET
  );
  const [heightInch, setHeightInch] = useState(
    defaultGender === MALE ? DEFAULT_MEN_INCHES : DEFAULT_WOMEN_INCHES
  );
  const [weight, setWeight] = useState(
    defaultGender === MALE ? DEFAULT_MEN_WEIGHT : DEFAULT_WOMEN_WEIGHT
  );
  const [age, setAge] = useState(DEFAULT_AGE);
  const [hasUserChangedAnyValue, setHasUserChangedAnyValue] = useState(false);

  const isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;

  useEffect(() => {
    if (defaultGender && defaultGender.length > 0) {
      setGenderSelected(true);
    }
  },[defaultGender])

  const onGenderChange = (e) => {
    setGender(e.target.value);
    setGenderSelected(true);
    if (!hasUserChangedAnyValue) {
      setHeightFeet(gender === MALE ? DEFAULT_MEN_FEET : DEFAULT_WOMEN_FEET);
      setHeightInch(
        gender === MALE ? DEFAULT_MEN_INCHES : DEFAULT_WOMEN_INCHES
      );
      setWeight(gender === MALE ? DEFAULT_MEN_WEIGHT : DEFAULT_WOMEN_WEIGHT);
    }
  };

  const onSubmit = () => {
    onProfileDetailsSubmit({
      gender: gender,
      heightFeet: heightFeet,
      heightInch: heightInch,
      weight: weight,
      age: age,
    });
    handleNextStep();
  };

  const handleIncrement = (key) => {
    setHasUserChangedAnyValue(true);
    if (key === "heightFeet") {
      validateAndSetFeet(heightFeet, INCREMENT, setHeightFeet);
    } else if (key === "heightInch") {
      validateAndSetInches(heightInch, INCREMENT, setHeightInch);
    } else if (key === "weight") {
      validateAndSetWeight(INCREMENT, weight, setWeight);
    } else if (key === "age") {
      validateAndSetAge(INCREMENT, false, setAge);
    }
  };

  const handleDecrement = (key) => {
    setHasUserChangedAnyValue(true);
    if (key === "heightFeet") {
      validateAndSetFeet(heightFeet, DECREMENT, setHeightFeet);
    } else if (key === "heightInch") {
      validateAndSetInches(heightInch, DECREMENT, setHeightInch);
    } else if (key === "weight") {
      validateAndSetWeight(DECREMENT, weight, setWeight);
    } else if (key === "age") {
      validateAndSetAge(DECREMENT, false, setAge);
    }
  };

  const downEvent = (key, type) => {
    clearInterval(timer);
    timer = null;
    if (key === "age") {
      timer = setInterval(() => {
        validateAndSetAge(type, true, setAge);
      }, touchduration);
    }
    if (key === "weight") {
      timer = setInterval(() => {
        validateWeightOnLongPress(type, setWeight);
      }, touchduration);
    }
  };

  const upEvent = () => {
    clearInterval(timer);
    timer = null;
  };

  return (
    <section className="text-center w-100p mx-auto">
       <p className="fs-4 fw-bold mb-0 text-center page-title">
        { MEAL_PLAN_STEPS.MY_PROFILE}
      </p>
      <div className="personal-info-step">
      <small className="mb-2 mt-0 d-flex text-muted mx-3">{CHOOSE_YOUR_GENDER}</small>
        <Card.Body className="px-0 d-flex justify-content-between">
          <label className="gender-card justify-content-center relative mb-3 mt-0">
            <input
              name="gender"
              className="radio"
              value={MALE}
              type="radio"
              readOnly
              defaultChecked={gender === MALE ? true : false}
              onChange={onGenderChange}
            />
            <span
              className="plan-details"
              onClick={() => {
                setGender(MALE);
              }}
            >
              <span className="plan-cost1">
                {/* <MdMale /> */}
                <img src={MaleIcon} alt="Icon" height="60" />
              </span>
            </span>
            <div className="pl-lable-info">
              <label>Male</label>
            </div>
          </label>
          <label className="gender-card justify-content-center relative mb-3 mt-0">
            <input
              name="gender"
              className="radio"
              type="radio"
              value={FEMALE}
              readOnly
              defaultChecked={gender === FEMALE ? true : false}
              onChange={onGenderChange}
            />
            <span
              className="plan-details"
              onClick={() => {
                setGender(FEMALE);
              }}
            >
              <span className="plan-cost1">
                {/* <MdFemale /> */}
                <img src={FemaleIcon} alt="Icon" height="60" />
              </span>
            </span>
            <div className="pl-lable-info">
              <label>Female</label>
            </div>
          </label>
        </Card.Body>

        <Card.Body className="px-0 d-flex justify-content-between">
          <div className="pinfo-box relative mb-3">
            <div className="pinfo-box-item">
              <button
                type="button"
                className={`pinfo-box-item-btn ${heightFeet === PERSONAL_INFO.MIN_FEET ? "disabled-state" : ""}`}
                onClick={() => handleDecrement("heightFeet")}
                disabled={heightFeet === PERSONAL_INFO.MIN_FEET ? true : false }
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                min="1"
                max="6"
                value={heightFeet}
                readOnly
                style={{ display: "none" }}
              />
              <div className="pl-info-value">{heightFeet}</div>
              <button
                type="button"
                className={`pinfo-box-item-btn ${heightFeet === PERSONAL_INFO.MAX_FEET ? "disabled-state" : ""}`}
                onClick={() => handleIncrement("heightFeet")}
                disabled={heightFeet === PERSONAL_INFO.MAX_FEET ? true : false }
              >
                <GrAdd />
              </button>
            </div>
            <div className="pl-lable-info">
              <label>{PERSONAL_INFO.HEIGHT_FEET}</label>
            </div>
          </div>

          <div className="pinfo-box relative mb-3">
            <div className="pinfo-box-item">
              <button
                type="button"
                className={`pinfo-box-item-btn ${heightInch === PERSONAL_INFO.MIN_INCHES ? "disabled-state" : ""}`}
                onClick={() => handleDecrement("heightInch")}
                disabled={heightInch === PERSONAL_INFO.MIN_INCHES ? true : false }
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                min="1"
                max="11"
                step="1"
                value={heightInch}
                style={{ display: "none" }}
              />
              <div className="pl-info-value">{heightInch}</div>
              <button
                type="button"
                className={`pinfo-box-item-btn ${heightInch === PERSONAL_INFO.MAX_INCHES ? "disabled-state" : ""}`}
                onClick={() => handleIncrement("heightInch")}
                disabled={heightInch === PERSONAL_INFO.MAX_INCHES ? true : false }
              >
                <GrAdd />
              </button>
            </div>
            <div className="pl-lable-info">
              <label>{PERSONAL_INFO.HEIGHT_INCHES}</label>
            </div>
          </div>
        </Card.Body>

        <Card.Body className="px-0 d-flex justify-content-between">
          <div className="pinfo-box relative mb-3">
            <div className="pinfo-box-item">
              <button
                type="button"
                className={`pinfo-box-item-btn ${weight === PERSONAL_INFO.MIN_WEIGHT ? "disabled-state" : ""}`}
                onClick={() => handleDecrement("weight")}
                onTouchStart={() => downEvent("weight", DECREMENT)}
                onTouchEnd={upEvent}
                disabled={weight === PERSONAL_INFO.MIN_WEIGHT ? true : false }
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                min="1"
                max="9"
                step="1"
                value={weight}
                style={{ display: "none" }}
              />
              <div className="pl-info-value">{weight}</div>
              <button
                type="button"
                className={`pinfo-box-item-btn  ${weight === PERSONAL_INFO.MAX_WEIGHT ? "disabled-state" : ""}`}
                onClick={() => handleIncrement("weight")}
                onTouchStart={() => downEvent("weight", INCREMENT)}
                onTouchEnd={upEvent}
                disabled={weight === PERSONAL_INFO.MAX_WEIGHT ? true : false }
              >
                <GrAdd />
              </button>
            </div>
            <div className="pl-lable-info">
              <label>{PERSONAL_INFO.WEIGHT}</label>
            </div>
          </div>

          <div className="pinfo-box relative mb-3">
            <div className="pinfo-box-item">
              <button
                type="button"
                className={`pinfo-box-item-btn  ${age === PERSONAL_INFO.MIN_AGE ? "disabled-state" : ""}`}
                onClick={() => handleDecrement("age")}
                onTouchStart={() => downEvent("age", DECREMENT)}
                onTouchEnd={upEvent}
                disabled={age === PERSONAL_INFO.MIN_AGE ? true : false }
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                value={age}
                min="1"
                max="100"
                style={{ display: "none" }}
              />
              <div className="pl-info-value">{age}</div>
              <button
                type="button"
                className={`pinfo-box-item-btn  ${age === PERSONAL_INFO.MAX_AGE ? "disabled-state" : ""}`}
                onClick={() => handleIncrement("age")}
                onTouchStart={() => downEvent("age", INCREMENT)}
                onTouchEnd={upEvent}
                disabled={age === PERSONAL_INFO.MAX_AGE ? true : false }
              >
                <GrAdd />
              </button>
            </div>
            <div className="pl-lable-info">
              <label>{PERSONAL_INFO.AGE}</label>
            </div>
          </div>
        </Card.Body>
      </div>
      <div className="d-flex btn-group vl-action-btn">
        {/* <button
          type="button"
          className="btn w-50p vl-go-back-btn"
          onClick={handleBack}
        >
          Go Back
        </button> */}
        <button
          type="button"
          className="btn w-100p vl-go-next-btn"
          onClick={onSubmit}
          disabled={!genderSelected}
        >
          {NEXT}
        </button>
      </div>
    </section>
  );
};

export default PersonalInfo;
