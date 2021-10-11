import React, { useState, useEffect } from "react";
import vlLogo from "./../../assets/Vibrant-Living-logo.png";
import {
  Badge,
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Row,
  ListGroup,
} from "react-bootstrap";
import "./styles.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/actions/products";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import { useHistory, useRouteMatch } from "react-router-dom";

import { CognitoUserPool } from "amazon-cognito-identity-js";
import { IoCloseOutline } from "react-icons/io5";
import { getTokenFailure } from "../../store/actions/auth";
import ProfileImg from "./../../assets/thumbnail-profile-pic.jpg";

const poolData = {
  UserPoolId: "us-east-1_LmIBVgrWX",
  ClientId: "1elqc1ok4eqb1c9sjlhhiq74sd",
};

const UserPool = new CognitoUserPool(poolData);

export default function AppBar() {
  const { path } = useRouteMatch();
  let history = useHistory();
  const [SeacrhQuery, setSeacrhQuery] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const dispatch = useDispatch();
  const [Query, setQuery] = useState("");

  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const mapValuesForOptions = (options) => {
    let newOptions = [];
    options?.items?.map((item) => {
      newOptions.push({ value: item.id, label: item.display_name });
    });
    console.log("NewOPtions", newOptions);
    setSearchedProducts(newOptions);
  };

  useEffect(async () => {
    console.log("products.searchResults", products.searchResults);
    mapValuesForOptions(products.searchResults);
  }, [products.searchResults]);

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setQuery(inputValue);
    dispatch(searchProducts(inputValue));
  };

  const logoutCognitoUser = () => {
    // const currentUser = getCurrentUser();

    // var cognitoUser = UserPool.getCurrentUser();
    // if (cognitoUser != null) {
    //     cognitoUser.signOut(
    //       {
    //                    onFailure: error =>   console.log("Logout Failure", error),
    //                    onSuccess: result =>
    //        console.log('Logout success: ' + result)
    // }
    // )}
    sessionStorage.removeItem("token");
    history.replace("/login");
    dispatch(getTokenFailure());
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        sticky="top"
      >
        <Container fluid className="flex-nowrap custom-nav">
          <div>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              // className="border-0 px-0"
              onClick={() => setMenu(true)}
            />
            <Navbar.Brand href="/">
              <img
                alt=""
                src={vlLogo}
                height="50"
                className="d-inline-block align-top mx-2"
              />
            </Navbar.Brand>
          </div>
          {/* <Navbar.Collapse id="responsive-navbar-nav">
  </Navbar.Collapse> */}

          <Nav>
            <Container fluid>
              <Row>
                <Col className="d-lg-block search-section">
                  {/* <InputGroup>
      <FormControl
        aria-label="search..."
        placeholder="Search..."
        value={SeacrhQuery}
        onChange={handleChange}
      /> */}
                  {/* <InputGroup.Text>
        <AiOutlineSearch />
      </InputGroup.Text>
    </InputGroup> */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 10px",
                    }}
                  >
                    {path == "/" ? (
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

                <Col className="d-flex flex-nowrap px-0 profile-menu">
                  <Nav.Link>
                    <div className="customNavBar">
                      <strong className="text-black profile-name-txt">
                        Hello, {userDetails.name}
                      </strong>
                    </div>
                  </Nav.Link>

                  <Nav.Link onClick={() => history.push("/cart")}>
                    <h6 className="text-black nav-menu-cart">
                      <AiOutlineShoppingCart size={24} />
                      <Badge pill>
                        {Cart?.cartDetails?.items?.length &&
                          Cart?.cartDetails?.items[0]?.items?.length}
                      </Badge>
                    </h6>
                  </Nav.Link>
                </Col>
              </Row>
            </Container>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas
        show={showMenu}
        onHide={() => setMenu(false)}
        backdrop={true}
        style={{ width: 350 }}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <div style={{ position: "relative", height: 180 }}>
            <div style={{ height: 100, background: "rgba(240, 89, 34, 0.4)" }}>
              {/* <span style={{ padding: 5, right: 0, top: 0, color: '#FFF', position: 'absolute', fontSize: 25 }}>
                <IoCloseOutline />
              </span> */}
            </div>
            <div
              style={{
                height: 100,
                background: "orange",
                width: 100,
                borderRadius: "50%",
                background: `url(${ProfileImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: 50,
                bottom: 0,
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>
          </div>
          <h6 className="text-center">
            {userDetails.name} <br /> {userDetails.phone_number}
          </h6>

          <ListGroup variant="flush">
            <ListGroup.Item
              onClick={() => {
                setMenu(false);
                history.push("/");
              }}
            >
              Home
            </ListGroup.Item>
            <ListGroup.Item>My Profile</ListGroup.Item>
            <ListGroup.Item>Subscriptions</ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                setMenu(false);
                history.push("/orders/");
              }}
            >
              My Orders
            </ListGroup.Item>
            <ListGroup.Item onClick={logoutCognitoUser}>Log Out</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
