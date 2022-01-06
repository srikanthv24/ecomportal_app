import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Image,
  Alert,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  loginSuccess,
  authError,
  authLoading,
  updateUserDetails,
} from "../../store/actions/auth";
import VLogo from "../../assets/Vibrant-Living-logo.png";
import "./styles.css";
import "./styles.css";
import auth_services from "../../services/auth_services";
import { hideLogin } from "../../store/actions";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { tokenList, loading, error } = useSelector((state) => state.auth);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  console.log("tokenList:::::::::", tokenList);

  const getUserDetails = () => {
    auth_services.getUser().then((res) => {
      dispatch(updateUserDetails(res));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authLoading());
    auth_services
      .login(phone, password)
      .then((res) => {
        getUserDetails();
        console.log("OnSuccess: ", res, res.accessToken);
        dispatch(loginSuccess(res));
        sessionStorage.setItem("token", res.accessToken.jwtToken);
        dispatch(hideLogin())
      })
      .catch((err) => {
        console.log("onFailure: ", err.message);
        dispatch(authError(err.message));
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
          <p className="fs-5 fw-bold mt-4 mb-3 secondary-color" style={{fontFamily:'Roboto Mono',fontWeight:'500',fontSize:'15px', textTransform:'uppercase'}}>Sign In</p>
          <Form className="customform">
            <InputGroup className="mb-3">
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <FormControl
                autoFocus
                type="number"
                placeholder="Mobile Number"
                maxLength={10}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </InputGroup>
            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                placeholder="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FloatingLabel>
            <Button
              className="w-100 mb-3 custom-btn"
              variant="primary"
              onClick={handleSubmit}
              size="sm"
            >
              SignIn
            </Button>
            {/* <Nav className="text-center">
              <Nav.Item>
                <Nav.Link href="/register" style={{ paddingLeft: "0" }}>
                  Don't have an account? Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav> */}
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

export default Login;
