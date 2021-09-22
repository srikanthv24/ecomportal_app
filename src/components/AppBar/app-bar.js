import React, { useState, useEffect } from "react";
import logo_image from "./../../assets/Group 737.png";
import {
  Badge,
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import "./styles.css";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/actions/products";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import { Link, Redirect, useHistory, useRouteMatch } from "react-router-dom";

import { CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { getTokenFailure } from "../../store/actions/auth";

const poolData ={
  UserPoolId:"us-east-1_LmIBVgrWX",
  ClientId: '1elqc1ok4eqb1c9sjlhhiq74sd'
  // ClientId:"6q6vj7100vmj9tr5s4jrp5cv8i"
}

const UserPool = new CognitoUserPool(poolData);

export default function AppBar() {
  const { path } = useRouteMatch();
  let history = useHistory();
  const [SeacrhQuery, setSeacrhQuery] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const dispatch = useDispatch();
  const [Query, setQuery] = useState("");

  const products = useSelector((state) => state.products);
  const Cart = useSelector((state) => state.Cart);

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
   }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="mr-5 border-0"
            />
            <img
              alt=""
              src={logo_image}
              height="55"
              className="d-inline-block align-top ml-5"
            />
          </Navbar.Brand>
          {/* <Navbar.Collapse id="responsive-navbar-nav">
        </Navbar.Collapse> */}

          <Nav>
            <Container>
              <Row>
                <Col className="d-none d-lg-block">
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
                </Col>

                <Col>
                  <NavDropdown
                    title={<span className="text-white">Hello, Sridevi</span>}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#action3">
                      Account Balance
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Subscriptions
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item href="#action5">
                      Your Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action6" onClick={logoutCognitoUser}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Col>
                <Col>
                  <Nav.Link onClick={() => history.push("/cart")}>
                    <h6 className="text-white">
                      <AiOutlineShoppingCart size={24} />
                      <Badge bg="secondary" pill>
                        {Cart.cartDetails.qty}
                      </Badge>
                    </h6>
                  </Nav.Link>
                </Col>
              </Row>
            </Container>
          </Nav>
        </Container>
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
              variant="outline-dark"
              active
              onClick={() => history.goBack()}
            >
              <BiArrowBack />
            </Button>
          ) : null}
          <div style={{ width: "100%" }}>
            <Select
              style={{ width: "100%" }}
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
      </Navbar>
    </>
  );
}
