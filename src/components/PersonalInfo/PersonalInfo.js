import React, { useEffect, useState } from "react";
import "./personalInfo.scss";
import { MdMale, MdFemale } from "react-icons/md";
import { Button, Card } from "react-bootstrap";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { NEXT, PERSONAL_INFO } from "../../utils/constants";
import handleValidations from "../../utils/handleValidations";
let timer;
let touchduration = 800; 
let count = 1;
const PersonalInfo = ({
  handleBack,
  handleNextStep,
  defaultGender,
  defaultHeightFeet,
  defaultHeightInch,
  defaultWeight,
  defaultAge,
  onProfileDetailsSubmit,
}) => {
  const [gender, setGender] = useState(defaultGender);
  let [heightFeet, setHeightFeet] = useState(defaultHeightFeet);
  const [heightInch, setHeightInch] = useState(defaultHeightInch);
  const [weight, setWeight] = useState(defaultWeight);
  const [age, setAge] = useState(defaultAge);

  const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

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

  const [error, setError] = useState({
    ageErrorMsg: "",
    ageError: false,
    weigthErrorMsg: "",
    weightError: false,
    heigthFeetErrorMsg: "",
    heigthFeetError: false,
    heigthInchErrorMsg: "",
    heigthInchError: false,
  });

  const ageValidator = (type, longPress = false) => {
    if (type === "increment") {
      longPress ? setAge((age) => age + 10) : setAge((age) => age + 1);
    } else {
      longPress ? setAge((age) => age - 10) : setAge((age) => age - 1);
    }
  };

  useEffect(() => {
    if(age >= 120) {
      setAge(120);
      const msg = "Please enter a valid age";
      setError((err) => ({ ...err, ageError: true, ageErrorMsg: msg }));
    } else if (age <= 5) {
      setAge(5);
      const msg = "Please enter a valid age";
      setError((err) => ({ ...err, ageError: true, ageErrorMsg: msg }));
    } else {
      setError((err) => ({ ...err, ageError: false, ageErrorMsg: "" }));
    }
  }, [age])

  const weigthValidator = (type, longPress = false) => {
    if (type === "increment") {
      longPress ? setWeight((weight) => weight + 10) : setWeight((weight) => weight + 1);
    } else {
      longPress ? setWeight((weight) => weight - 10) : setWeight((weight) => weight - 1);
    }
  };

  useEffect(() => {
    if(weight >= 200) {
      setWeight(200);
      const msg = "Please enter a valid weight";
      setError((err) => ({ ...err, weightError: true, weigthErrorMsg: msg }));
    } else if (weight <= 5) {
      setWeight(5);
      const msg = "Please enter a valid weight";
      setError((err) => ({ ...err, weightError: true, weigthErrorMsg: msg }));
    } else {
      setError((err) => ({ ...err, weightError: false, weigthErrorMsg: "" }));
    }
  }, [weight])

  const heigthFeetValidator = (heightFeet, type) => {
    const { error, msg } = handleValidations.heightFeetValidation(
      heightFeet,
      type
    );
    if (error) {
      setError((err) => ({
        ...err,
        heigthFeetError: true,
        heightFeetErrorMsg: msg,
      }));
    } else {
      type === "increment"
        ? setHeightFeet((prevHeigthFeet) => prevHeigthFeet + 1)
        : setHeightFeet((prevHeigthFeet) => prevHeigthFeet - 1);
      setError((err) => ({
        ...err,
        heigthFeetError: false,
        heightFeetErrorMsg: "",
      }));
    }
  };

  const heigthInchValidator = (heightInch, type) => {
    const { error, msg } = handleValidations.heightInchValidation(
      heightInch,
      type
    );
    if (error) {
      setError((err) => ({
        ...err,
        heigthInchError: true,
        heightInchErrorMsg: msg,
      }));
    } else {
      type === "increment"
        ? setHeightInch((prevHeigthInch) => prevHeigthInch + 1)
        : setHeightInch((prevHeigthInch) => prevHeigthInch - 1);
      setError((err) => ({
        ...err,
        heigthInchError: false,
        heightInchErrorMsg: "",
      }));
    }
  };

  const handleIncrement = (key) => {
    if (key === "heightFeet") {
      heigthFeetValidator(heightFeet, "increment");
    } else if (key === "heightInch") {
      heigthInchValidator(heightInch, "increment");
    } else if (key === "weight") {
      weigthValidator("increment");
    } else if (key === "age") {
      ageValidator("increment");
    }
  };

  const handleDecrement = (key) => {
    if (key === "heightFeet") {
      heigthFeetValidator(heightFeet, "decrement");
    } else if (key === "heightInch") {
      heigthInchValidator(heightInch, "decrement");
    } else if (key === "weight") {
      weigthValidator("decrement");
    } else if (key === "age") {
      ageValidator("decrement");
    }
  };
  
  const downEvent = (key, type) => {
    clearInterval(timer);
    timer = null;
    if (key === "age") {
      timer = setInterval(() => {ageValidator(type, true)}, touchduration);
    }
    if (key === "weight") {
      timer = setInterval(() => {weigthValidator(type, true)}, touchduration);
    }
    // timer = setInterval(updateAge, touchduration);
  }

  const upEvent = () => {
    clearInterval(timer);
    timer = null;
  }

  useEffect(() => {}, [error]);

  return (
    <section className="text-center w-100p mx-auto">
      <div className="py-4">
        <Card.Body className="py-3 px-0 d-flex justify-content-between">
          <label class="gender-card justify-content-center">
            <input
              name="gender"
              class="radio"
              value="Male"
              type="radio"
              readOnly
              defaultChecked={gender === "Male" ? true : false}
            />
            <span
              class="plan-details"
              onClick={() => {
                setGender("Male");
              }}
            >
              <span class="plan-cost">
                <MdMale />
              </span>
            </span>
          </label>
          <label class="gender-card justify-content-center">
            <input
              name="gender"
              class="radio"
              type="radio"
              value="Female"
              readOnly
              defaultChecked={gender === "Female" ? true : false}
            />
            <span
              class="plan-details"
              onClick={() => {
                setGender("Female");
              }}
            >
              <span class="plan-cost">
                <MdFemale />
              </span>
            </span>
          </label>
        </Card.Body>

        <Card.Body className="py-3 px-0 d-flex justify-content-between">
          <div className="pinfo-box">
            <div className="text-muted">
              <label>{PERSONAL_INFO.HEIGHT_FEET}</label>
            </div>
            <div className="pinfo-box-item">
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleDecrement("heightFeet")}
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                min="1"
                max="9"
                value={heightFeet}
                readOnly
                style={{ display: "none" }}
              />
              <div style={{ width: "100%", height: "100%", fontSize: "50px" }}>
                {heightFeet}
              </div>
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleIncrement("heightFeet")}
              >
                <GrAdd />
              </button>
            </div>
            <p>{error.heightFeetErrorMsg}</p>
          </div>

          <div className="pinfo-box">
            <div className="text-muted">
              <label>{PERSONAL_INFO.HEIGHT_INCHES}</label>
            </div>
            <div className="pinfo-box-item">
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleDecrement("heightInch")}
              >
                <GrSubtract />
              </button>
              <input
                type="number"
                min="1"
                max="9"
                step="1"
                value={heightInch}
                style={{ display: "none" }}
              />
              <div style={{ width: "100%", height: "100%", fontSize: "50px" }}>
                {heightInch}
              </div>
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleIncrement("heightInch")}
              >
                <GrAdd />
              </button>
            </div>
            <p>{error.heightInchErrorMsg}</p>
          </div>
        </Card.Body>

        <Card.Body className="py-3 px-0 d-flex justify-content-between">
          <div className="pinfo-box">
            <div className="text-muted">
              <label>{PERSONAL_INFO.WEIGHT}</label>
            </div>
            <div className="pinfo-box-item">
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleDecrement("weight")}
                onTouchStart={() => downEvent("weight", "decrement")} onTouchEnd={upEvent}
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
              <div style={{ width: "100%", height: "100%", fontSize: "50px" }}>
                {weight}
              </div>
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleIncrement("weight")}
                onTouchStart={() => downEvent("weight", "increment")} onTouchEnd={upEvent} 
              >
                <GrAdd />
              </button>
            </div>
            <p>{error.weigthErrorMsg}</p>
          </div>

          <div className="pinfo-box">
            <div className="text-muted">
              <label>{PERSONAL_INFO.AGE}</label>
            </div>
            <div className="pinfo-box-item">
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleDecrement("age")}
                onTouchStart={() => downEvent("age", "decrement")} onTouchEnd={upEvent} 
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
              <div style={{ width: "100%", height: "100%", fontSize: "50px" }}>
                {age}
              </div>
              <button
                type="button"
                className="pinfo-box-item-btn"
                onClick={() => handleIncrement("age")}
                onTouchStart={() => downEvent("age", "increment")} onTouchEnd={upEvent} 
              >
                <GrAdd />
              </button>
            </div>
            <p>{error.ageErrorMsg}</p>
          </div>
        </Card.Body>
      </div>
      <div className="stepper-btn-container">
        <Button
          className="w-100 m-1 stepper-btn"
          onClick={onSubmit}
          disabled={
            error.ageError ||
            error.weightError ||
            error.heigthFeetError ||
            error.heigthInchError
              ? true
              : false
          }
        >
          {NEXT}
        </Button>
      </div>
    </section>
  );
};

export default PersonalInfo;
