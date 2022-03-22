import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  Alert,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  InputGroup,
  FormControl,
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

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { tokenList, loading, error, isRegistered } = useSelector(
    (state) => state.auth
  );
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");

  //console.log("tokenList:::::::::", tokenList);
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

  const getUserDetails = () => {
    auth_services.getUser().then((res) => {
      dispatch(updateUserDetails(res));
    });
  };

  const handleSubmit = (event) => {
    registerSchema.isValid(FormData).then((res) => {
      if (res) {
        // console.log("isValid", res);
        setFormErrors({});
        event.preventDefault();
        dispatch(authLoading());
        auth_services
          .login(FormData.phone, FormData.password)
          .then((res) => {
            getUserDetails();
            //console.log("OnSuccess: ", res, res.accessToken);
            dispatch(loginSuccess(res));
            sessionStorage.setItem("token", res.accessToken.jwtToken);
            dispatch(hideLogin());
          })
          .catch((err) => {
            //console.log("onFailure: ", err.message);
            dispatch(authError(err.message));
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

  useEffect(() => {
    dispatch(clearAuthError());
    // setPhone("");
    // setPassword("");
  }, []);

  if (loading) {
    return <p className="fs-5 fw-bold mt-2 text-center">Loading....</p>;
  }

  return (
    <div className="container text-center login-container">
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <p
            className="fs-5 fw-bold mt-4 mb-3 secondary-color"
            style={{
              fontFamily: "Roboto",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            {`${
              isRegistered
                ? " Successfully Registered. Try to login now."
                : "login to continue..."
            }`}
          </p>
          <Form className="customform">
            <InputGroup className="mb-1">
              <InputGroup.Text id="phone">+91</InputGroup.Text>
              <FormControl
                autoFocus
                type="number"
                placeholder="Phone Number"
                maxLength={10}
                value={FormData.phone}
                onChange={(ev) => handleChange("phone", ev.target.value)}
              />
            </InputGroup>
            <p
              className="text-danger"
              style={{
                fontSize: 12,
                fontWeight: 600,
                paddingLeft: 5,
                paddingTop: 5,
                textAlign:"start"
              }}
            >
              {FormErrors.phone}
            </p>
            {/* <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                placeholder="password"
                type="password"
                value={FormData.password}
                onChange={(ev) => handleChange("password", ev.target.value)}
              />
            </FloatingLabel> */}
            <Form.Group className="mb-3" controlId="forName">
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
                  paddingTop: 5,
                  textAlign:"start"
                }}
              >
                {FormErrors.password}
              </p>
            </Form.Group>
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
