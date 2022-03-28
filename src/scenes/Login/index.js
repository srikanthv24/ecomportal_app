import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import {
  Alert,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  InputGroup
} from "react-bootstrap";
import {
  loginSuccess,
  authError,
  authLoading,
  updateUserDetails,
  clearAuthError,
} from "../../store/actions/auth";
import "./styles.css";
// import "./styles.css";
import auth_services from "../../services/auth_services";
import { hideLogin } from "../../store/actions";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  password: yup.string().required("Password is required."),
  phone: yup
    .string()
    .required("Phone is required.")
    .max(10, "Phone number shouldn't exceed 10 digits")
    .min(10, "Phone number must be 10 digits"),
});

const Login = (props) => {
  const dispatch = useDispatch();
  const { tokenList, loading, error, isRegistered, resetSuccessMessage } = useSelector((state) => state.auth);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data) => {
    dispatch(authLoading());
    auth_services
      .login(data.phone, data.password)
      .then((res) => {
        getUserDetails();
        //console.log("OnSuccess: ", res, res.accessToken);
        dispatch(loginSuccess(res));
        localStorage.setItem("token", res.accessToken.jwtToken);
        dispatch(hideLogin());
      })
      .catch((err) => {
        //console.log("onFailure: ", err.message);
        dispatch(authError(err.message));
      });
  }

  //console.log("tokenList:::::::::", tokenList);

  const getUserDetails = () => {
    auth_services.getUser().then((res) => {
      dispatch(updateUserDetails(res));
    });
  };

  useEffect(() => {
    dispatch(clearAuthError());
    reset();
  }, [])

  const handleSignUpClick = () => {
    props.handleModalType('register');
  }

  const handleForgotClick = () => {
    props.handleModalType('forgot');
  }
  

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <p class="h3 mb-3 text-center" style={{
              fontFamily: "Roboto",
              fontWeight: "700",
            }}>Login</p>
          {/* <div className="text-center mt-4">
            <Image src={VLogo} height="40" />
          </div> */}
          <p class="fw-bold">Sign in with your mobile number and password</p>
          <Form className="customform" onSubmit={handleSubmit(onSubmit)} >
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <Form.Control
                className={errors.phone && 'is-invalid'}
                type="text"
                {...register("phone", { required: true, pattern: /^([7-9]{1})([0-9]{9})$/ })}
              />
            </InputGroup>
            {errors.phone && <p className="text-danger" style={{ textAlign: "left" }}>Please enter a valid phone no</p>}
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
                    required: true
                })}
              />
            </FloatingLabel>
            {errors.password && 
              <p className="text-danger" style={{ textAlign: "left" }}>Please enter your password</p>
            }
            <Form.Check 
              type="checkbox"
              id="remember-me"
              label="Remember me"
            />
            <p className="text-right">
            <a href="#" onClick={handleForgotClick}>Forgot Password?</a>
            </p>
            <Button
              className="w-100 mt-2 mb-3 btn btn-primary btn-lg"
              variant="primary"
              type="submit"
              size="lg"
            >
              SignIn
            </Button>

            <p className="text-muted text-center">
              New to Vibrant Living? <a href="#" onClick={handleSignUpClick}>Sign Up</a>
            </p>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {resetSuccessMessage && (
              <Alert variant="success" className="mt-2">
                {resetSuccessMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
