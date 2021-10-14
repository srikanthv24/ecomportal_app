import React, { useState } from "react";
import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Image,
  Alert,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
} from "../../store/actions/auth";
import { useHistory } from "react-router";
import VLogo from "../../assets/Vibrant-Living-logo.png";
import "../Login/styles.css";
import auth_services from "../../services/auth_services";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading, cognitoUserDetails, error } = useSelector(
    (state) => state.auth
  );

  console.log("userData:::", cognitoUserDetails);
  console.log("error:::", error);

  const handleSubmit = (e) => {
    dispatch(authLoading());
    e.preventDefault();
    console.log("signup btn is pressed", name, phone, password);
    auth_services
      .registerUser(name, phone, password)
      .then((res) => {
        dispatch(signupSuccess(res));
        console.log("succesfully created the user:::", res);
        history.replace("/login");
      })
      .catch((error) => {
        dispatch(authError(error.message));
        console.log("error in registering user:::", error.message);
      });
  };

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container text-center login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <div className="text-center mt-4">
            <Image src={VLogo} height="80" />
          </div>
          <p className="fs-5 fw-bold mt-4 mb-3 secondary-color">
            Create Account
          </p>
          <Form className="customform">
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <FormControl
                required
                autoFocus
                type="number"
                placeholder="Mobile Number"
                maxLength={10}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </InputGroup>

            <FloatingLabel controlId="name" label="Name" className="mt-2">
              <Form.Control
                type="text"
                value={name}
                placeholder="Name"
                required
                onChange={(event) => setName(event.target.value)}
                autoComplete="off"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Password"
              className="mt-2"
            >
              <Form.Control
                required
                type="password"
                value={password}
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
                className="mb-3"
              />
            </FloatingLabel>
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-10 characters long, must contain an upper
              case letter, number and special character.
            </Form.Text>
            <Button
              className="w-100 mb-3 mt-3 custom-btn"
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
    </div>
  );
};

export default Register;
