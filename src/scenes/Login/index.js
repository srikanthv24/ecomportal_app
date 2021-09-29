import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import {Image, Alert, Row, Col, Form, FloatingLabel, Button, Nav, InputGroup, FormControl} from "react-bootstrap";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
import { loginSuccess, authError, authLoading } from '../../store/actions/auth';
import Logo from "../../assets/vl-logo.png";

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { tokenList, loading, error } = useSelector(state => state.auth);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    console.log("tokenList:::::::::", tokenList);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(authLoading());
        const user = new CognitoUser({
            Username: `+91${phone}`,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: `+91${phone}`,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("OnSuccess: ", data, data.accessToken);
                dispatch(loginSuccess(data));
                sessionStorage.setItem("token", data.accessToken.jwtToken);
                history.push('/')
            },
            onFailure: (err) => {
                console.log("onFailure: ", err.message);
                dispatch(authError(err.message));
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            },
        });
    };


    if(loading){
        return <p className="fs-5 fw-bold mt-2 text-center" >Loading....</p>
      }

    return (
        <Row className="m-2">
        <Col xs={12} sm={12} lg={6} style={{marginTop:"120px"}}>
                <div className="text-center mt-4">
                    <Image src={Logo} className="w-50"/>
                </div>
                <p className="fs-5 fw-bold mt-2">Sign In</p>
                <Form>
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
                 <FloatingLabel controlId="password" label="Password" className="mt-2">
                    <Form.Control
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FloatingLabel>
                     <Button
                        className="w-100 mt-2 fw-bold"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        SignIn
                    </Button>
                    <Nav> 
                    <Nav.Item >
                        <Nav.Link href="/register" style={{paddingLeft:"0"}}>Don't have an account? Sign Up</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    {error && 
                    <Alert variant="danger" className="mt-3">{error}</Alert>
                    }
                </Form>
        </Col>
        </Row>
    );
}

export default Login;