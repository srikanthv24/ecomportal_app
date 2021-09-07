import React, { useState, useEffect } from "react";
import logo_image from "./../../assets/Group 737.png";
import {
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
import Select from "react-select/async";

export default function AppBar() {
  const [SeacrhQuery, setSeacrhQuery] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const handleChange = (ev) => {
    const value = ev.target.value;
    console.log("search", value);
    if (value) {
      setSearchOn(true);

      setSeacrhQuery(value);
      dispatch(searchProducts(value));
    }
  };

  useEffect(async () => {
    console.log("products.searchResults", products.searchResults);
    setSearchedProducts(products.searchResults);
  }, [products.searchResults]);

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
          <Navbar.Brand href="#home">
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
                  <InputGroup>
                    <FormControl
                      aria-label="search..."
                      placeholder="Search..."
                      value={SeacrhQuery}
                      onChange={handleChange}
                    />
                    <InputGroup.Text>
                      <AiOutlineSearch />
                    </InputGroup.Text>
                  </InputGroup>
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
                    <NavDropdown.Item href="#action6">
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Col>
                <Col>
                  <Nav.Link>
                    <h6 className="text-white">
                      <AiOutlineShoppingCart size={24} />
                    </h6>
                  </Nav.Link>
                </Col>
              </Row>
            </Container>
          </Nav>
        </Container>
        <Container className="d-lg-none">
          <Row className="w-100">
            <Col sm="12">
              {/* <InputGroup> */}
                <Select
                  style={{ width: "100%" }}
                  placeholder="search product..."
                  closeMenuOnSelect={false}
                  options={[]}
                  // styles={colourStyles}
                />
                {/* <InputGroup.Text>
                  <AiOutlineSearch />
                </InputGroup.Text>
              </InputGroup> */}
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}
