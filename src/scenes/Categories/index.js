import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/categories";
import CategoryList from "./category-list";

var phantom = {
  display: "block",
  padding: "20px",
  height: "56px",
  width: "100%",
};
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  
  useEffect(() => {
    dispatch(getCategories({ limit: 50, nextToken: "" }));
  }, []);

  return (
    <>
      <div style={{ ...phantom }} />
      <Card.Header
        style={{
          position: "fixed",
          top: 118,
          zIndex: 999,
          width: "100%",
          background: "rgb(249, 243, 223)",
        }}
      >
        <div className="w-100">
          <div className="d-block text-left">
            <p className="h5 m-0 p-0 page-title"> Categories</p>
            <small className="text-muted value-txt">
              {categories.categories.length} Categories found
            </small>
          </div>
          <div>
            {/* <Button variant="outline-light" active size="lg">
              <AiOutlineSortAscending />
            </Button>
            <Button variant="outline-light" active size="lg">
              <VscSettings />
            </Button> */}
          </div>
        </div>
      </Card.Header>
      <Container fluid style={{background: "rgb(249, 243, 223)"}}>
        <CategoryList list={categories.categories} loading={categories.loading} />
      </Container>
    </>
  );
};

export default Categories;
