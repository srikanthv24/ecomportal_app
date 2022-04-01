import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  FloatingLabel,
  InputGroup
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
  clearAuthError
} from "../../store/actions/auth";
import "../Login/styles.css";
import auth_services from "../../services/auth_services";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  password: yup.string().required("Password is required."),
  name: yup
    .string()
    .required("Name field is required.")
    .min(4, "Name field must be atleast 4 characters long")
    .matches(/^[A-Z]([a-z][A-Z]?)+$/, "Name field must contain Uppercase letter"),
  phone: yup
    .string()
    .required("Phone is required.")
    .max(10, "Phone number shouldn't exceed 10 digits")
    .min(10, "Phone number must be 10 digits"),
});


const Register = (props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const { loading, cognitoUserDetails, error } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    dispatch(authLoading());
    auth_services
      .registerUser(data.name, data.phone, data.password)
      .then((res) => {
        dispatch(signupSuccess(res));
      })
      .catch((error) => {
        dispatch(authError(error.message));
      });
  };

  useEffect(() => {
    dispatch(clearAuthError());
    reset();
  }, []);

  const handleLogInClick = () => {
    props.handleModalType('login');
  }

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <p class="h3 my-3 text-center" style={{
              fontFamily: "Roboto",
              fontWeight: "700",
            }}>Signup</p>
          {/* <div className="text-center mt-4">
            <Image src={VLogo} height="40" />
          </div> */}
          <p class="fw-bold">Sign up with your mobile number, name and password</p>
          <Form className="customform" onSubmit={handleSubmit(onSubmit)} >
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <Form.Control
                className={errors.phone && 'is-invalid'}
                type="number"
                {...register("phone", { required: true, pattern: /^([7-9]{1})([0-9]{9})$/ })}
              />
            </InputGroup>
            {errors.phone && <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Please enter a valid phone number</p>}
            <FloatingLabel
              controlId="name"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                placeholder="Name"
                className={errors.name && 'is-invalid'}
                type="text"
                {...register("name", {
                    required: true
                })}
              />
            </FloatingLabel>
            {errors.name && <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Please enter your name</p>}
            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                placeholder="password"
                className={errors.password && 'is-invalid'}
                type="password"
                {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
                })}
              />
            </FloatingLabel>
            {errors.password && 
              <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Your password should be minimum 8 characters and 1 small letter, 1 capital letter, 1 number and 1 special character atleast</p>
            }
            <Button
              className="w-100 mt-2 mb-3 btn btn-lg modal-footer-btn"
               type="submit"
              size="lg"
            >
              SignUp
            </Button>

            <p className="text-muted text-center">
              Already an account with Vibrant Living? <a style={{color: "#614731",whiteSpace:"nowrap"}} href="#" onClick={handleLogInClick}>Sign In</a>
            </p>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
