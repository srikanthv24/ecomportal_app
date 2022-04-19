import React, { useState, useEffect } from "react";
import vlLogoWhite from "./../../assets/home/vl-logo-white.svg";
import {
  Badge,
  Button,
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
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/actions/products";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import {
  clearUserDetails,
  getTokenFailure,
  loginSuccess,
} from "../../store/actions/auth";
import ProfileImg from "./../../assets/thumbnail-profile-pic.png";
import auth_services from "../../services/auth_services";
import { handleLoginLink, showLogin } from "../../store/actions";
import arrowRightIcon from "./../../assets/arrow-right.png";
import MenuIcon from "./../../assets/home/search-normal.svg";
import CustomSpinner from "../CustomSpinner";
import { getCart } from "../../store/actions";
import SmileFaceIcon from "./../../assets/home/smile.svg";
import CartIcon from "./../../assets/home/cart.svg";
import { getOrders } from "../../store/actions/orders";

export default function AppBar() {
  const { path } = useRouteMatch();
  let history = useHistory();
  const [showMenu, setMenu] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const dispatch = useDispatch();
  const [Query, setQuery] = useState("");

  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);

  // const mapValuesForOptions = (options) => {
  //   let newOptions = [];
  //   options?.items?.map((item) => {
  //     if(item !== null ){
  //       newOptions.push({ value: item.id, label: item.display_name });
  //       return null;
  //     }

  //   });
  //   setSearchedProducts(newOptions);
  // };

  // useEffect(() => {
  //   mapValuesForOptions(products.searchResults);
  // }, [products.searchResults]);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "").toUpperCase();
    setQuery(inputValue);
    dispatch(searchProducts(inputValue));
  };

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
    const customerId = userDetails.sub;

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
        // bg="light"
        variant="light"
        sticky="top" className="vl-navbar-header"
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
              }}
            >
              {/* <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              onClick={() => setMenu(true)}
            /> */}

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
                  height="70"
                  className="d-inline-block align-top"
                  style={{ marginTop: "-.5rem" }}
                />
              </Link>
            </Navbar.Brand>
          </div>
          <Nav className="vl-navbar">
            <Container fluid className="px-0">
              <Row>
                <Col className="d-lg-block1 search-section1 d-none">
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 10px",
                    }}
                  >
                    {path === "/" ? (
                      <Button
                        className="back-btn"
                        active
                        onClick={() => history.goBack()}
                      >
                        <BiArrowBack />
                      </Button>
                    ) : null}
                    <div style={{ width: "100%" }}>
                      <Select
                        style={{
                          width: "100%",
                          borderRadius: ".25rem 0px 0px .25rem !important",
                        }}
                        className="custom-select-box"
                        placeholder="search product..."
                        closeMenuOnSelect={false}
                        inputValue={Query}
                        isClearable
                        isSearchable
                        onChange={(val) => {
                          val && history.push("/products/" + val.value);
                        }}
                        options={searchedProducts}
                        onInputChange={handleInputChange}
                      />
                    </div>
                  </div>
                </Col>

                {userDetails.sub ? (
                  <Col className="d-flex flex-nowrap px-0 profile-menu">
                    <Nav.Link>
                      <div className="customNavBar">
                        <strong className="text-black profile-name-txt">
                          Hello, {userDetails.name}
                        </strong>
                      </div>
                    </Nav.Link>
                    {Cart?.cartLoading ? (
                      <Nav.Link onClick={onCartButtonClick}>
                        <h6 className="text-black nav-menu-cart">
                          {/* <AiOutlineShoppingCart size={24} /> */}
                          <img src={CartIcon} alt="Icon" height="30" />
                          <Badge pill>
                            <span className="cart-loading">
                              <Spinner animation="border" role="status" />
                            </span>
                            {Cart?.cartDetails?.items?.length &&
                              Cart?.cartDetails?.items?.length}
                          </Badge>
                        </h6>
                      </Nav.Link>
                    ) : (
                      <>
                      <Nav.Link onClick={onCartButtonClick}>
                        <h6 className="text-black nav-menu-cart abcd">
                          {/* <AiOutlineShoppingCart size={24} /> */}
                          <img src={CartIcon} alt="Icon" height="30" />
                          <Badge pill>
                            {Cart?.cartDetails?.items?.length &&
                              Cart?.cartDetails?.items?.length}
                          </Badge>
                        </h6>
                      </Nav.Link>
                      <div className="vl-profile-icon" onClick={onProfileClick}>
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
                      {/* <Nav.Link onClick={handleLoginModal}>
                        <p
                          className="text-black nav-menu-cart"
                          style={{ paddingRight: "1rem" }}
                        >
                          Login / SignUp
                        </p>
                      </Nav.Link> */}
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
          {/* <div style={{ position: "relative", height: 204 }}>
            <div style={{ height: 150, background: "#F38144" }}></div>
            <div
              style={{
                height: 100,
                width: 100,
                borderRadius: "50%",
                background: `url(${ProfileImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: 100,
                bottom: 0,
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>
          </div> */}
          {/* <h6 className="text-center">
            {userDetails.name} <br /> {userDetails.phone_number}
          </h6> */}
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
            {userDetails.sub ? (
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
                    {/* <img src={arrowRightIcon} alt="icon" height="18" /> */}
                  </div>
                </ListGroup.Item>
                {/* <ListGroup.Item className="menuItem">Subscriptions</ListGroup.Item> */}
                <ListGroup.Item
                  onClick={() => {
                    setMenu(false);
                    dispatch(
                      getOrders({
                        customer_number: userDetails.phone_number.substring(3),
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
                    {/* <img src={arrowRightIcon} alt="icon" height="18" /> */}
                  </div>
                </ListGroup.Item>
              </>
            ) : null}
            {userDetails.sub ? (
              <ListGroup.Item onClick={logoutCognitoUser}>
                <div
                  className="d-flex align-items-center justify-content-center menu-item"
                  style={{ justifyContent: "space-between" }}
                >
                  Log Out
                  {/* <img src={arrowRightIcon} alt="icon" height="18" /> */}
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item onClick={handleLoginModal}>
                <div
                  className="d-flex align-items-center justify-content-center menu-item"
                  style={{ justifyContent: "space-between" }}
                >
                  Log In
                  {/* <img src={arrowRightIcon} alt="icon" height="18" /> */}
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
