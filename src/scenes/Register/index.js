import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
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


const Register = () => {
  const dispatch = useDispatch();
  const { loading, cognitoUserDetails, error } = useSelector(
    (state) => state.auth
  );

  const [FormData, setFormData] = useState({
    phone: "",
    password: "",
    name: "",
  });

  const [FormErrors, setFormErrors] = useState({});

  const handleChange = (key, value) => {
        let FormErrorsCopy = {...FormErrors};
        delete FormErrorsCopy[key];
        setFormErrors(FormErrorsCopy);
        if (key == "phone") {
          if (value.length <= 10)
            setFormData((prevState) => ({ ...prevState, [key]: value }));
        } else {
          setFormData((prevState) => ({ ...prevState, [key]: value }));
        }

  };

  const handleSubmit = (e) => {
    // console.log("FormData", FormData);
    registerSchema.isValid(FormData).then((res) => {
      if (res) {
        // console.log("isValid", res);
        setFormErrors({});
        dispatch(authLoading());
        e.preventDefault();
        auth_services
          .registerUser(FormData.name, FormData.phone, FormData.password)
          .then((res) => {
            dispatch(signupSuccess(res));
          })
          .catch((error) => {
            dispatch(authError(error.message));
          });
      } else {
        let isVaidated = registerSchema
          .validate(FormData, {
            abortEarly: false,
          })
          .then((res) => {
            console.log("isValid-1", res);
            return res;
          })
          .catch((err) => {
            let temp = {};
            err.inner.map((error) => {
              // console.log("isValidError", error.path);
              temp[error.path] = error.message;
            });
            setFormErrors(temp);
            // console.log("TEMP_+_+", temp);
            return err;
          });
        // console.log("isValid___", isVaidated);
      }
    });
  };

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <p className="fs-5 fw-bold mt-4 mb-3 secondary-color text-center">
            Create Account
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="forMobileNumber">
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                maxLength={10}
                value={FormData.phone}
                onChange={(ev) => handleChange("phone", ev.target.value)}
                style={{ height: "52px" }}
                required
              />
              <p
                className="text-danger"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  paddingLeft: 5,
                  paddingTop: 5
                }}
              >
                {FormErrors.phone}
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="forName">
              <Form.Control
                type="text"
                required
                value={FormData.name}
                onChange={(ev) => handleChange("name", ev.target.value)}
                style={{ height: "52px" }}
                placeholder="Name"
              />
                <p
                className="text-danger"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  paddingLeft: 5,
                  paddingTop: 5
                }}
              >
                {FormErrors.name}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={FormData.password}
                onChange={(ev) => handleChange("password", ev.target.value)}
              />
               <p
                className="text-danger"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  paddingLeft: 5,
                  paddingTop:5
                }}
              >
                {FormErrors.password}
              </p>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="custom-btn w-100 mt-2"
            >
              Register
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Register;
