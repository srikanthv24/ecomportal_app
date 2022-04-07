import React, { useState } from "react";
import "./personalInfo.scss";
import { MdMale, MdFemale } from "react-icons/md";
import { Card } from "react-bootstrap";
import { GrAdd, GrSubtract } from "react-icons/gr";

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

  const onSubmit = (data) => {
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
    if (key === "heightFeet") {
      setHeightFeet(heightFeet + 1);
    } else if (key === "heightInch") {
      setHeightInch(heightInch + 1);
    } else if (key === "weight") {
      setWeight(weight + 1);
    } else if (key === "age") {
      setAge(age + 1);
    }
  };

  const handleDecrement = (key) => {
    if (key === "heightFeet") {
      setHeightFeet(heightFeet - 1);
    } else if (key === "heightInch") {
      setHeightInch(heightInch - 1);
    } else if (key === "weight") {
      setWeight(weight - 1);
    } else if (key === "age") {
      setAge(age - 1);
    }
  };

  return (
    <section
      className="text-center w-100p mx-auto"
    >
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
                <MdMale
                />
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
              <label>Height-Feet</label>
              </div>
              <div className="pinfo-box-item">
              <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleDecrement("heightFeet")}
            >
              <GrSubtract />
            </button>
            <input type="number" min="1" max="9" value={heightFeet} readOnly />
            <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleIncrement("heightFeet")}
            >
              <GrAdd />
            </button>
              </div>
            </div>

            <div className="pinfo-box">
              <div className="text-muted">
              <label>Height-Inches</label>
              </div>
              <div className="pinfo-box-item">
              <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleDecrement("heightInch")}
            >
              <GrSubtract />
            </button>
            <input type="number" min="1" max="9" step="1" value={heightInch} />
            <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleIncrement("heightInch")}
            >
              <GrAdd />
            </button>
              </div>
            </div>
        
        </Card.Body>

        <Card.Body className="py-3 px-0 d-flex justify-content-between">
           <div className="pinfo-box">
              <div className="text-muted">
              <label>Weight</label>
              </div>
              <div className="pinfo-box-item">
              <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleDecrement("weight")}
            >
              <GrSubtract />
            </button>
            <input type="number" min="1" max="9" step="1" value={weight} />
            <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleIncrement("weight")}
            >
              <GrAdd />
            </button>
              </div>
            </div>

            <div className="pinfo-box">
              <div className="text-muted">
              <label>Age</label>
              </div>
              <div className="pinfo-box-item">
              <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleDecrement("age")}
            >
              <GrSubtract />
            </button>
            <input type="number" value={age} min="1" max="100" />
            <button
              type="button"
              className="pinfo-box-item-btn"
              onClick={() => handleIncrement("age")}
            >
              <GrAdd />
            </button>
              </div>
            </div>        
        </Card.Body>

      </div>
    </section>
  );
};

export default PersonalInfo;
