import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
  clearAuthError,
  updateUserDetails,
  loginSuccess,
} from "../../store/actions/auth";
import "../Login/styles.css";
import auth_services from "../../services/auth_services";
import * as yup from "yup";
import { hideLogin } from "../../store/actions";

const registerSchema = yup.object().shape({
  password: yup.string().required("Password is required."),
  name: yup
    .string()
    .required("Name field is required.")
    .min(4, "Name field must be atleast 4 characters long")
    .matches(
      /^[A-Z]([a-z][A-Z]?)+$/,
      "Name field must contain Uppercase letter"
    ),
  phone: yup
    .string()
    .required("Phone is required.")
    .max(10, "Phone number shouldn't exceed 10 digits")
    .min(10, "Phone number must be 10 digits"),
});

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
        dispatch(authLoading());
        auth_services.login(data.phone, data.password).then((res) => {
          getUserDetails();
          //console.log("OnSuccess: ", res, res.accessToken);
          dispatch(loginSuccess(res));
          localStorage.setItem("token", res.accessToken.jwtToken);
          localStorage.setItem("expiry-time", Date.now());
          dispatch(hideLogin());
        });
      })
      .catch((error) => {
        dispatch(authError(error.message));
      });
  };

  const getUserDetails = () => {
    auth_services.getUser().then((res) => {
      dispatch(updateUserDetails(res));
    });
  };

  useEffect(() => {
    dispatch(clearAuthError());
    reset();
  }, []);

  const handleLogInClick = () => {
    props.handleModalType("login");
  };

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12} className="px-0">
          <p className="vl-modal-title-txt">Signup</p>
          {/* <div className="text-center mt-4">
            <Image src={VLogo} height="40" />
          </div> */}
          <Form className="customform" onSubmit={handleSubmit(onSubmit)}>
            <p className="vl-modal-sub-desp-txt">
              Sign up with your mobile number, name and password
            </p>
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <Form.Control
                className={errors.phone && "is-invalid"}
                type="number"
                {...register("phone", {
                  required: true,
                  pattern: /^([7-9]{1})([0-9]{9})$/,
                })}
              />
            </InputGroup>
            {errors.phone && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Please enter a valid phone number
              </p>
            )}
            <FloatingLabel
              controlId="name"
              label="Name"
              className="mb-3 vl-input-element"
            >
              <Form.Control
                placeholder="Name"
                className={errors.name && "is-invalid"}
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
            </FloatingLabel>
            {errors.name && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Please enter your name
              </p>
            )}
            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3 vl-input-element"
            >
              <Form.Control
                placeholder="password"
                className={errors.password && "is-invalid"}
                type="password"
                style={{ marginBottom: "10px" }}
                {...register("password", {
                  required: true,
                  validate: {
                    hasUppercase: (value) =>
                      /^(?=.*[A-Z])/.test(value) ? true : false,
                    hasLowercase: (value) =>
                      /^(.*[a-z].*)/.test(value) ? true : false,
                    hasMinlength: (value) =>
                      /^.{6,10}$/.test(value) ? true : false,
                  },
                })}
              />
            </FloatingLabel>
            {errors.password && errors.password.type == "required" && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Your password should be minimum 8 characters, 1 Lowercase, 
                1 Uppercase Letter
              </p>
            )}
            {errors.password && errors.password.type === "hasUppercase" && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Your password should contain 1 Uppercase letter
              </p>
            )}
             {errors.password && errors.password.type === "hasLowercase" && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Your password should contain 1 Lowercase letter
              </p>
            )}
             {errors.password && errors.password.type === "hasMinlength" && (
              <p
                className="text-danger input-error-txt"
                style={{ textAlign: "left" }}
              >
                Your password should be min 6 - 10 char. long
              </p>
            )}
            <Button
              className="mt-2 mb-3 vl-login-submit-btn"
              type="submit"
              size="lg"
            >
              SignUp
            </Button>
            <p className="text-center vl-modal-footer-btn">
              Already an account with Vibrant Living?{" "}
              <a
                style={{ whiteSpace: "nowrap" }}
                className="vl-hyper-link-txt"
                href="#"
                onClick={handleLogInClick}
              >
                Sign In
              </a>
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
