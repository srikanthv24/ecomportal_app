import React, { useState } from "react";
import vlLogoWhite from "./../../assets/home/vl-logo-white.svg";
import {
  Badge,
  Col,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Row,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { clearUserDetails, getTokenFailure } from "../../store/actions/auth";
import auth_services from "../../services/auth_services";
import { handleLoginLink, showLogin } from "../../store/actions";
import MenuIcon from "./../../assets/home/search-normal.svg";
import { getCart } from "../../store/actions";
import SmileFaceIcon from "./../../assets/home/smile.svg";
import CartIcon from "./../../assets/home/cart.svg";
import { getOrders } from "../../store/actions/orders";

export default function AppBar() {
  let history = useHistory();
  const [showMenu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const { isLoading: cartLoading, itemsCount } = useSelector(
    (state) => state.Cart.cartCount
  );
  const { sub: customerId, name: customerName, phone_number : customerMobile } = useSelector(
    (state) => state.auth.userDetails
  );

  const logoutCognitoUser = () => {
    auth_services.logout();
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    dispatch(getTokenFailure());
    setMenu(false);
    history.push("/");
  };

  const handleLoginModal = () => {
    dispatch(handleLoginLink());
    dispatch(showLogin());
  };

  const onCartButtonClick = () => {
    if (customerId) {
      dispatch(getCart({ customer_id: customerId }));
    }
    history.push("/cart-summary");
  };

  const onProfileClick = () => {
    history.push("/profile");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        sticky="top"
        className="vl-navbar-header"
        style={{ position: "fixed", width: "100%" }}
      >
        <Container fluid className="flex-nowrap custom-nav">
          <div>
            <div
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                cursor: "pointer",
                zIndex:"9"
              }}
            >
              <img
                alt=""
                src={MenuIcon}
                height="25"
                className="d-inline-block align-top"
                onClick={() => setMenu(true)}
              />
            </div>
            <Navbar.Brand>
              <Link to="/">
                <img
                  alt=""
                  src={vlLogoWhite}                  
                  className="d-inline-block align-top vl-logo"
                  style={{ marginTop: "-.5rem" }}
                />
              </Link>
            </Navbar.Brand>
          </div>
          <Nav className="vl-navbar">
            <Container fluid className="px-0">
              <Row>
                {customerId ? (
                  <Col className="d-flex flex-nowrap px-0 profile-menu">
                    <Nav.Link>
                      <div className="customNavBar">
                        <strong className="text-black profile-name-txt">
                          Hello, {customerName}
                        </strong>
                      </div>
                    </Nav.Link>
                    {cartLoading ? (
                      <Nav.Link onClick={onCartButtonClick}>
                        <h6 className="text-black nav-menu-cart">
                          <img src={CartIcon} alt="Icon" height="30" />
                          <Badge pill>
                            <span className="cart-loading">
                              <Spinner animation="border" role="status" />
                            </span>
                            {itemsCount}
                          </Badge>
                        </h6>
                      </Nav.Link>
                    ) : (
                      <>
                        <Nav.Link onClick={onCartButtonClick}>
                          <h6 className="text-black nav-menu-cart">
                            <img src={CartIcon} alt="Icon" height="30" />
                            <Badge pill>{itemsCount}</Badge>
                          </h6>
                        </Nav.Link>
                        <div
                          className="vl-profile-icon"
                          onClick={onProfileClick}
                        >
                          <img
                            alt=""
                            src={SmileFaceIcon}
                            height="25"
                            className="d-inline-block align-top"
                          />
                        </div>
                      </>
                    )}
                  </Col>
                ) : (
                  <>
                    <div className="d-flex pt-2 cursor-pointer">
                      <img
                        alt=""
                        src={SmileFaceIcon}
                        height="25"
                        className="d-inline-block align-top"
                        onClick={handleLoginModal}
                      />
                    </div>
                  </>
                )}
              </Row>
            </Container>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas
        show={showMenu}
        onHide={() => setMenu(false)}
        backdrop={true}
        className="sideMenuWrapper"
      >
        <Offcanvas.Body
          style={{
            padding: "0px",
            position: "relative",
            background: "#F7F2DF",
          }}
        >
          <Offcanvas.Header
            closeButton
            className="closeBtn"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              zIndex: "100",
              color: "#ffffff",
              padding: "1.5rem",
            }}
          />
          <div style={{ minHeight: "150px" }}> </div>
          <ListGroup variant="flush" className="sideMenuListview">
            <ListGroup.Item
              onClick={() => {
                setMenu(false);
                history.push("/");
              }}
            >
              <div className="d-flex align-items-center justify-content-center menu-item">
                Home
              </div>
            </ListGroup.Item>
            {customerId ? (
              <>
                <ListGroup.Item
                  className="menuItem"
                  onClick={() => {
                    setMenu(false);
                    history.push("/profile");
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center menu-item"
                    style={{ justifyContent: "space-between" }}
                  >
                    My Profile
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  onClick={() => {
                    setMenu(false);
                    dispatch(
                      getOrders({
                        customer_number: customerMobile.substring(3),
                      })
                    );
                    history.push("/orders/");
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center menu-item"
                    style={{ justifyContent: "space-between" }}
                  >
                    Subscriptions
                  </div>
                </ListGroup.Item>
              </>
            ) : null}
            {customerId ? (
              <ListGroup.Item onClick={logoutCognitoUser}>
                <div
                  className="d-flex align-items-center justify-content-center menu-item"
                  style={{ justifyContent: "space-between" }}
                >
                  Log Out
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item onClick={handleLoginModal}>
                <div
                  className="d-flex align-items-center justify-content-center menu-item"
                  style={{ justifyContent: "space-between" }}
                >
                  Log In
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
