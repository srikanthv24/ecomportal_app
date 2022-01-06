import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FloatingLabel, Button } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  getGender,
  getDietPreference,
  getPhysicalActivity,
  getGoalList,
  saveUserData,
} from "../../store/actions/customer";

export default function UserDetails({
  handleBack,
  handleNextStep,
  activeStep,
}) {
  const customerValues = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [goal, setGoal] = useState([]);
  const [diet, setDiet] = useState([]);
  const [gender, setGender] = useState([]);
  const [phyActivity, setPhyActivity] = useState([]);

  useEffect(() => {
    dispatch(getGender());
    dispatch(getPhysicalActivity());
    dispatch(getDietPreference());
    dispatch(getGoalList());
  }, []);

  useEffect(() => {
    console.log("first step state data after loading::::", customerValues);
  }, [customerValues]);

  const [userData, setUserData] = useState({
    goal: "",
    dietpreference: "",
    physicalactivity: "",
    weight: "",
    height: "",
    gender: "",
    name: "ChittyTheRobo",
    email: "robo@email.com",
    phone: "987654321",
    age: "27",
  });

  useEffect(() => {
    let temp1 = [];

    customerValues &&
      Object.keys(customerValues.goalList).length &&
      customerValues.goalList.__type.enumValues.map((option) => {
        temp1.push({
          label: option.name,
          value: option.name,
        });
      });
    // console.log("my mutuation array:::", temp1);
    setGoal(temp1);

    let temp2 = [];

    customerValues &&
      Object.keys(customerValues.dietList).length &&
      customerValues.dietList.__type.enumValues.map((option) => {
        temp2.push({
          label: option.name,
          value: option.name,
        });
      });
    setDiet(temp2);
    let temp3 = [];

    customerValues &&
      Object.keys(customerValues.genderList).length &&
      customerValues.genderList.__type.enumValues.map((option) => {
        temp3.push({
          label: option.name,
          value: option.name,
        });
      });
    setGender(temp3);

    let temp4 = [];
    customerValues &&
      Object.keys(customerValues.activityList).length &&
      customerValues.activityList.__type.enumValues.map((option) => {
        temp4.push({
          label: option.name,
          value: option.name,
        });
      });
    setPhyActivity(temp4);
  }, [customerValues]);

  const handleDataChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
    dispatch(saveUserData({ ...userData, [key]: value }));
  };

  return (
    <>
      <p className="fs-4 fw-bold mb-3 text-center">Personal Information</p>
      <Form className="m-3">
        <p className="h6 text-start mb-1">What is your goal?</p>
        <Select
          name="goal"
          placeholder="Select your goal"
          options={goal}
          className="mb-3"
          onChange={(e) => handleDataChange("goal", e.value)}
        />
        <p className="h6 text-start mb-1">Meal Preference</p>
        <Select
          name="dietpreference"
          placeholder="Select your meal type"
          options={diet}
          className="mb-3 text-start"
          onChange={(e) => handleDataChange("dietpreference", e.value)}
        />

        <p className="h6 text-start mb-1">Physical Activity</p>
        <Select
          name="physicalactivity"
          placeholder="select..."
          options={phyActivity}
          className="mb-3 text-start"
          onChange={(e) => handleDataChange("physicalactivity", e.value)}
        />

        <p className="h6 text-start mb-1">Gender</p>
        <Select
          name="gender"
          // placeholder="select..."
          options={gender}
          className="mb-3 text-start"
          onChange={(e) => handleDataChange("gender", e.value)}
        />

        <FloatingLabel name="weight" label="Weight (in kgs)" className="mt-3">
          <Form.Control
            type="text"
            value={userData.weight}
            onChange={(e) => handleDataChange("weight", e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel name="height" label="Height (in cms)" className="mt-3">
          <Form.Control
            type="text"
            value={userData.height}
            onChange={(e) => handleDataChange("height", e.target.value)}
          />
        </FloatingLabel>
      </Form>

      <div className="d-flex mt-2">
       {!activeStep == 0 ? <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className="w-50 m-1"
          variant="secondary"
        >
          Back
        </Button> : <div className="w-50 m-1" />}
        <Button className="w-50 m-1" onClick={handleNextStep} style={{background: '#f05922', borderColor: "#f05922"}}>
          Next
        </Button>
      </div>
    </>
  );
}
