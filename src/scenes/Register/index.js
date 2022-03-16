import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  signupSuccess,
  authError,
  authLoading,
} from "../../store/actions/auth";
import { useHistory } from "react-router";
// import VLogo from "../../assets/Vibrant-Living-logo.png";
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

  const handleSubmit = (e) => {
    dispatch(authLoading());
    e.preventDefault();
    auth_services
      .registerUser(name, phone, password)
      .then((res) => {
        dispatch(signupSuccess(res));
        // history.replace("/login");
      })
      .catch((error) => {
        dispatch(authError(error.message));
      });
  };

  useEffect(() => {    
    return () => {
      setName("");
      setPhone("");
      setPassword("");
    }
  }, [])
  

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          {/* <div className="text-center mt-4">
            <Image src={VLogo} height="40" />
          </div> */}
          <p className="fs-5 fw-bold mt-4 mb-3 secondary-color text-center">
            Create Account
          </p>
          {/* <Form className="customform">
            <InputGroup className="mb-3" hasValidation>
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <FormControl
              size="sm"
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
                size="sm"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
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
                size="sm"
                placeholder="password"
                value={password}
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
          </Form> */}
          <Form>
            <Form.Group className="mb-3" controlId="forMobileNumber">
              {/* <Form.Label>Mobile Number</Form.Label> */}
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                maxLength={10}
                value={phone}
                onChange={(event) => setPhone(event.target.value)} style={{height:'52px'}}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="forName">
              {/* <Form.Label>Name</Form.Label> */}
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)} style={{height:'52px'}}
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)} style={{height:'52px'}}
              />
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
