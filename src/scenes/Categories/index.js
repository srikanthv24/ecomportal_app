import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/categories";
import CategoryList from "./category-list";

var phantom = {
  display: "block",
  padding: "20px",
  height: "70px",
  width: "100%",
};
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    console.log("CATEGORIEEEE", categories);
  }, [categories]);
  return (
    <>
      <div style={{ ...phantom }} />
      <Card.Header
        style={{
          position: "fixed",
          top: 118,
          zIndex: 999,
          width: "100%",
          background: "#f5f5f5",
        }}
      >
        <div className="w-100">
          <div>
            <p className="h5 m-0 p-0"> Categories</p>
            <small className="text-muted">
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
      <Container fluid>
        <CategoryList list={categories.categories} />
      </Container>
    </>
  );
};

export default Categories;
