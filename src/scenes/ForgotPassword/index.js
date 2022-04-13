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
  resetSuccess,
} from "../../store/actions/auth";
// import "./styles.css";
import auth_services from "../../services/auth_services";
import { hideLogin } from "../../store/actions";

const ForgotPassword = (props) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const onSubmit = (data) => {
    setLoading(prev => !prev);
    if (!showOtp) {
      auth_services
        .forgot(data.phone)
        .then((res) => {
          setLoading(prev => !prev);
          setShowOtp(prev => !prev);
          setPhone(data.phone);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      auth_services
        .reset(data.phone, data.otp, data.password)
        .then((res) => {
          setLoading(prev => !prev);
          setShowOtp(prev => !prev);
          dispatch(resetSuccess());
          handleLogInClick();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }

  const handleLogInClick = () => {
    props.handleModalType('login');
  }
  

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12} className="px-0">
          <p className="vl-modal-title-txt">Forgot Password</p>
          {/* <div className="text-center mt-4">
            <Image src={VLogo} height="40" />
          </div> */}
          <Form className="customform" onSubmit={handleSubmit(onSubmit)} >
          <p className="vl-modal-sub-desp-txt">Reset your password with your registered phone number</p>          
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <Form.Control
                className={errors.phone && 'is-invalid'}
                disabled={showOtp}
                type="number"
                {...register("phone", { required: true, pattern: /^([7-9]{1})([0-9]{9})$/ })}
              />
            </InputGroup>
            {errors.phone && <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Please enter a valid phone number</p>}
            {
              showOtp ?
                <>
                  <FloatingLabel
                    controlId="otp"
                    label="OTP"
                    className="mb-3 vl-input-element"
                  >
                    <Form.Control
                      placeholder="otp"
                      className={errors.otp && 'is-invalid'}
                      type="text"
                      {...register("otp", {
                          required: true, pattern: /^\d{6}$/
                      })}
                    />
                  </FloatingLabel>
                  {errors.otp && <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Please enter a valid otp</p>}
                  <FloatingLabel
                    controlId="password"
                    label="New Password"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="new password"
                      className={errors.password && 'is-invalid'}
                      type="password"
                      {...register("password", {
                          required: true,
                          pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
                      })}
                    />
                  </FloatingLabel>
                  {errors.password && 
                    <p className="text-danger" style={{ textAlign: "left" }}>Your password should be min 8 Char and one small letter, one capital letter and one number atleast</p>
                  }
                  <FloatingLabel
                    controlId="confPassword"
                    label="Confirm Password"
                    className="mb-3"
                  >
                    <Form.Control
                      placeholder="confirm password"
                      className={errors.confPassword && 'is-invalid'}
                      type="password"
                      {...register("confPassword",  {
                        validate: (value) => value === getValues("password")
                      })}
                    />
                  </FloatingLabel>
                  {errors.confPassword && 
                    <p className="text-danger input-error-txt" style={{ textAlign: "left" }}>Your password does not match</p>
                  }
                </>
              :
              ''
            }
            
            <Button
              className="mt-2 mb-3 vl-login-submit-btn"             
              type="submit"
              size="lg"
            >
              { !showOtp ? 'Request OTP' : 'Reset Password' }
            </Button>

            <p className="vl-modal-footer-btn text-center">
              Don't want to reset? <a className="vl-hyper-link-txt" href="#" onClick={handleLogInClick}>Sign In</a>
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
}

export default ForgotPassword;
