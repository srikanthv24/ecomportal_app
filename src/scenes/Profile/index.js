import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { BiRupee } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { getCustomerBalance } from '../../store/actions';
import UserProfileIcon from "../../assets/user-profile.png";
import UserProfileWhiteIcon from "../../assets/user-profile-white.png";
import {
    clearUserDetails,
    getTokenFailure,
    loginSuccess,
  } from "../../store/actions/auth";
  import auth_services from "../../services/auth_services";
  import { useHistory, useRouteMatch, Link } from "react-router-dom";


export const Profile = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.auth.userDetails);
    const balanceState = useSelector((state) => state.balanceReducer);


    useEffect(() => {
        if (userDetails.sub && userDetails.sub.length) {
            console.log("balance action creator is called", userDetails.sub);
            dispatch(getCustomerBalance({ customerId: userDetails.sub }))
        }
    }, [userDetails.sub]);

    console.log("balance redux state", balanceState);
    const logoutCognitoUser = () => {
        auth_services.logout();
        localStorage.removeItem("token");
        dispatch(clearUserDetails());
        dispatch(getTokenFailure());       
        history.push("/");
      };


    return (
        <Container fluid className="px-0">
            <Container fluid>
                <Row className="vl-bg-1">
                    <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "250px" }}>
                        {/* <img src="https://ui-avatars.com/api/?name=Ania+Bista&background=A1A1A1&color=FFFFFF&rounded=true"
                        width="150"
                        style={{ borderRadius: "200px" }}
                    /> */}
                        <div className="profile-icon-bg">
                            <img src={UserProfileWhiteIcon} width="100" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <section className="profile-info-block px-4">
                {userDetails?.name && (
                    <>
                        <Row className="pt-4">
                            <Col className='value-txt'>Name</Col>
                        </Row>
                        <Row>
                            <Col className='value-txt clr-black'>{userDetails?.name}</Col>
                        </Row>
                    </>
                )
                }
                {userDetails?.phone_number && (
                    <>
                        <Row className="mt-2">
                            <Col className='value-txt'>Mobile</Col>
                        </Row>
                        <Row>
                            <Col className='value-txt clr-black'>{userDetails?.phone_number}</Col>
                        </Row>
                    </>
                )
                }
                {/* {balanceState && balanceState?.getCustomerBalance && ( */}
                <>
                    <Row className="mt-2">
                        <Col className='value-txt'>Wallet balance</Col>
                    </Row>
                    <Row>
                        <Col className='value-txt clr-black'> <BiRupee />{balanceState.getCustomerBalance?.amount !== undefined ? Number(balanceState.getCustomerBalance?.amount).toFixed(2) : Number(0).toFixed(2)}</Col>
                    </Row>
                </>
                {/* )}  */}
                {/* <Row>
                <Col className='value-txt'>Email</Col>
            </Row>
            <Row>
                <Col className='value-txt clr-black'>test@gmail.com</Col>
            </Row> 
            <Row>
                <Col className='value-txt'>Address</Col>
            </Row>
            <Row>
                <Col className='value-txt clr-black'></Col>
            </Row>*/}
                <Row className="mt-2">
                    <Col>
                    <div class="custom-diet-btn my-3" onClick={logoutCognitoUser}>Log Out</div>                        
                    </Col>
                </Row>
            </section>
        </Container>
    )
}