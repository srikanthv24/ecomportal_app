import React, { useState } from "react";
import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Image,
  Alert,
  Nav
} from "react-bootstrap";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
//import { getCurrentUser } from "amazon-cognito-identity-js"
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import Logo from "../../assets/vl-logo.png";
import UserPool from "../Login/UserPool";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
} from "../../store/actions/auth";
import { useHistory } from "react-router";
// import { authError } from "../../store/actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading, userData, error } = useSelector((state) => state.auth);

  console.log("userData:::", userData);
  console.log("error:::", error);

  const handleSubmit = (e) => {
    dispatch(authLoading());
    e.preventDefault();
    console.log("signup btn is pressed", name, phone, password);

    var attributeList = [];

    var dataPhoneNumber = {
      Name: "phone_number",
      Value: `+91${phone}`,
    };

    var dataName = {
      Name: "name",
      Value: name,
    };

    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attributeName = new CognitoUserAttribute(dataName);

    attributeList.push(attributePhoneNumber);
    attributeList.push(attributeName);

    UserPool.signUp(
      `+91${phone}`,
      password,
      attributeList,
      null,
      function (error, data) {
        if (data) {
          dispatch(signupSuccess(data));
          console.log("succesfully created the user:::", data);
          history.replace("/login");
        } else {
          dispatch(authError(error.message));
          console.log("error in registering user:::", error.message);
        }
      }
    );
  };

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <Row className="m-2">
      <Col xs={12} sm={12} lg={6} style={{marginTop:"110px"}}>
        <div className="text-center mt-4">
          <Image src={Logo} className="w-50" />
        </div>

        <p className="fs-5 fw-bold mt-2">Create Account</p>
        <Form>
          <FloatingLabel name="phone" label="Phone Number" className="mt-2">
            <Form.Control
              autoFocus
              type="tel"
              maxLength={10}
              //placeholder="+91"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel name="name" label="Name (optional)" className="mt-2">
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel name="password" label="Password (max 8 characters)" className="mt-2">
            <Form.Control
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FloatingLabel>
          <Button
            className="w-100 mt-3 fw-bold"
            variant="primary"
            onClick={handleSubmit}
          >
            SignUp
          </Button>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/login" style={{ paddingLeft: "0" }}>
              Already have an account? Sign In
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Col>
    </Row>
  );
};

export default Register;
