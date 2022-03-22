import React, { useEffect, useState } from "react";
import Login from "./../../scenes/Login";
import Register from "./../../scenes/Register";
import "./styles.css";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {clearAuthError} from '../../store/actions/auth';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((state) => state.auth);
  const [isExistingUser, setExistingUser] = useState("register");

  useEffect(() => {
    if (isRegistered) {
      setExistingUser("login");
    } else {
      setExistingUser("register");
    }
  }, [isRegistered]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [isExistingUser])
  

  return (
    <Tab.Container
      //defaultActiveKey="login"
      activeKey={isExistingUser}
      onSelect={(k) => setExistingUser(k)}
    >
      <Nav
        activeKey={isExistingUser}
        onSelect={(k) => setExistingUser(k)}
        justify
        variant="pills"
        className="mt-5"
      >
        <Nav.Item>
          <Nav.Link style={{ textDecoration: "none", cursor:"pointer" }} eventKey="login">
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: "none", cursor:"pointer" }} eventKey="register">
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content className="mt-5">
        <Tab.Pane eventKey="login">
          <Login />
        </Tab.Pane>
        <Tab.Pane eventKey="register">
          <Register />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default LoginModal;
