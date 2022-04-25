import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerBalance } from "../../store/actions";
import UserProfileWhiteIcon from "../../assets/user-profile-white.png";
import { clearUserDetails, getTokenFailure } from "../../store/actions/auth";
import auth_services from "../../services/auth_services";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { sub : customerId, name: customerName, phone_number: customerMobile } = useSelector((state) => state.auth.userDetails);
  const balanceState = useSelector((state) => state.balanceReducer);

  useEffect(() => {
    if (customerId && customerId.length) {
      dispatch(getCustomerBalance({ customerId: customerId }));
    }
  }, [customerId]);

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
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "250px",
            }}
          >
            <div className="profile-icon-bg">
              <img src={UserProfileWhiteIcon} width="100" alt="profile" />
            </div>
          </Col>
        </Row>
      </Container>
      <section className="profile-info-block px-4">
        {customerName && (
          <>
            <Row className="pt-4">
              <Col className="value-txt">Name</Col>
            </Row>
            <Row>
              <Col className="value-txt clr-black">{customerName}</Col>
            </Row>
          </>
        )}
        {customerMobile && (
          <>
            <Row className="mt-2">
              <Col className="value-txt">Mobile</Col>
            </Row>
            <Row>
              <Col className="value-txt clr-black">
                {customerMobile}
              </Col>
            </Row>
          </>
        )}
        <>
          <Row className="mt-2">
            <Col className="value-txt">Wallet balance</Col>
          </Row>
          <Row>
            <Col className="value-txt clr-black">
              <BiRupee />
              {balanceState.getCustomerBalance?.amount !== undefined
                ? Number(balanceState.getCustomerBalance?.amount).toFixed(2)
                : Number(0).toFixed(2)}
            </Col>
          </Row>
        </>
        <Row className="mt-2">
          <Col>
            <div class="custom-diet-btn my-3" onClick={() => history.push("/")}>
              Back
            </div>
          </Col>
          <Col>
            <div class="custom-diet-btn my-3" onClick={logoutCognitoUser}>
              Log Out
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};
