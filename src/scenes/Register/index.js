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
import { hideLogin } from "../../store/actions";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPwdErrors, setShowPwdErrors] = useState(false);
  const [uppercaseError, setUppercaseError] = useState(false);
  
  const [lowecaseError, setLowercaseError] = useState(false);
  const [pwdLengthError, setPwdLengthError] = useState(false);

  const onSubmit = (data) => {
    dispatch(authLoading());
    auth_services
      .registerUser(data.name, data.phone, data.password)
      .then((res) => {
        dispatch(signupSuccess(res));
        dispatch(authLoading());
        auth_services.login(data.phone, data.password).then((res) => {
          getUserDetails();
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

  useEffect(() => {
    if (errors.password && errors.password.type == "required") {
      setShowPwdErrors(true);
      setUppercaseError(false);
      setLowercaseError(false);
      setPwdLengthError(false);
    } else if(errors.password && errors.password.type == "hasUppercase"){
      setShowPwdErrors(true);
      setUppercaseError(false);                                                            
    } else if(errors.password && errors.password.type == "hasLowercase"){
      setShowPwdErrors(true);
      setLowercaseError(false);
    } else if(errors.password && errors.password.type == "hasMinlength"){
      setShowPwdErrors(true);
      setPwdLengthError(false);
    }
  }, [errors?.password]);

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
                onFocus={() =>setShowPwdErrors(true)}
                {...register("password", {
                  required: true,
                  validate: {
                    hasLowercase: (value) => {
                      if (/^(.*[a-z].*)/.test(value)) {
                        setLowercaseError(true);
                        return true;
                      } else {
                        setLowercaseError(false);
                        return false;
                      }
                    },
                    hasMinlength: (value) => {
                      if (/^.{6,10}$/.test(value)) {
                        setPwdLengthError(true);
                        return true;
                      } else {
                        setPwdLengthError(false);
                        return false;
                      }
                    },
                    hasUppercase: (value) => {
                      if (/^(?=.*[A-Z])/.test(value)) {
                        setUppercaseError(true);
                        return true;
                      } else {
                        setUppercaseError(false);
                        return false;
                      }
                    },
                  },
                })}
              />
              {showPwdErrors && (
                <div>
                  <p
                    className={`${
                      uppercaseError ? "text-success" : "text-danger"
                    } input-error-txt`}
                    style={{ textAlign: "left" }}
                  >
                    Password must have 1 Uppercase char.
                  </p>
                  <p
                    className={`${
                      lowecaseError ? "text-success" : "text-danger"
                    } input-error-txt`}
                    style={{ textAlign: "left" }}
                  >
                    Password must have 1 Lowercase char.
                  </p>

                  <p
                    className={`${
                      pwdLengthError ? "text-success" : "text-danger"
                    } input-error-txt`}
                    style={{ textAlign: "left" }}
                  >
                    Password must be 6-10 char. long.
                  </p>
                </div>
              )}
            </FloatingLabel>
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
