import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Select, { components } from "react-select";
import { Calendar } from "react-multi-date-picker";
import "./styles.css";
import { useForm } from "react-hook-form";
import moment from "moment";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

const SelectMenuButton = (props) => {
  return (
    <components.MenuList {...props}>
      {props.children}
      <Button variant="outline-dark" className="w-100">
        <GrAdd /> New address
      </Button>
    </components.MenuList>
  );
};

const CustomOption = ({ innerRef, innerProps, data, children }) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <span style={{ cursor: "pointer" }}>{children}</span>
      <span style={{ cursor: "pointer" }}>
        <AiFillDelete onClick={(event) => {}} />
      </span>
    </div>
  );
};

export const MealBooking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const handleData = (data) => {
    console.log("DATA", data);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

 
  return (
    <Container
      fluid
      style={{
        background: "rgb(249, 243, 223)",
        marginTop: "80px",
        height: "100%",
      }}
    >
      <Row>
        <Col>
          <p className="fs-4 fw-bold mb-3 text-center page-title">
            Meal Booking
          </p>
        </Col>
      </Row>
      <Form className="m-3">
      {activeStep == 0 ? (
          <>
          <p className="h6 text-start mb-1 text-muted">Choose Meal Sessions</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Breakfast
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Lunch
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Dinner
            </label>
          </div>
        </>  
      ) : activeStep == 1 ? (
        <>
        <p className="h6 text-start mb-1 mt-2 text-muted">Choose Meal Plan</p>
        <Select
          name="mealpaln"
          placeholder="Meal Plans"
          className="mb-3 text-start"
        />
        <InputGroup className="my-2">
          <InputGroup.Text>Start Date</InputGroup.Text>
          <FormControl
            type="date"
            min={moment(new Date()).format("YYYY-MM-DD")}
          />
        </InputGroup>
        <div style={{ width: "100%", overflow: "scroll" }}>
          <Calendar multiple numberOfMonths={2} style={{ width: "100%" }} />
        </div>
      </>
      ) : activeStep == 2 ? (
        <>
        <p className="h6 text-muted mt-3 mb-0 m-2">Delivery Address *</p>
        <Select
          placeholder={"Address..."}
          components={{
            MenuList: SelectMenuButton,
            Option: CustomOption,
          }}
        />
        <div className="mb-1">
          <label
            htmlFor="name"
            className="h6 text-muted mt-3 mb-0 m-2 form-label"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true, maxLength: 20 })}
          />
        </div>
        {errors.name?.type === "required" && "Name is required"}

        <div className="mb-1">
          <label
            htmlFor="mobile"
            className="h6 text-muted mt-3 mb-0 m-2 form-label"
          >
            Mobile
          </label>
          <input
            type="text"
            className="form-control"
            {...register("mobile", { required: true, maxLength: 10 })}
          />
        </div>
        {errors.mobile?.type === "required" && "Mobile is required"}
      </>
      ) : null}
      <div style={{display:"flex", justifyContent:"space-between"}}>

     
      {activeStep == 0 ? " " :(
          <Button
          className="w-50 m-1"
          style={{
            width: "50%",
            background: "#F05922",
            borderColor: "#F05922",
          }}
          onClick={() => handleBack()} 
        >
          Back
        </Button>
      )
        }
        <Button
          className="w-50 m-1"
          style={{
            width: "50%",
            background: "#F05922",
            borderColor: "#F05922",
          }}
          onClick={() => handleNext()}
        //   onClick={handleSubmit(handleData)}
        >
            {activeStep == 2 ? "Finish" : "Next" }
        </Button>

        </div>
      </Form>
    </Container>
  );
};
