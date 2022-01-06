import React, { useState } from "react";
import Login from "./../../scenes/Login";
import Register from "./../../scenes/Register";
import "./styles.css";

import { Button, Tabs, Tab, Nav } from "react-bootstrap";

const LoginModal = () => {
  const [isExistingUser, setExistingUser] = useState('login');

  return (

    <Tab.Container
      defaultActiveKey="login"
      activeKey={isExistingUser}
      onSelect={(k) => setExistingUser(k)}
      
    >
      <Nav justify variant="pills" className="mt-5" >
        <Nav.Item >
          <Nav.Link style={{ textDecoration: "none" }} eventKey="login">
            Login
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: "none" }} eventKey="register">
            Register
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
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
