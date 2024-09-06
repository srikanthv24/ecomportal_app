import React from "react";
import { Button, Card, Col, Navbar, Row } from "react-bootstrap";
import MealCard from "./mealcard";

const MealPlansList = ({ list, handleNextStep }) => {
  console.log("listlist", list);

  if (!list.length) {
    return <h3 className="text-center">Loading....</h3>;
  }
  
  return (
    <Row className="m-0">
      <Col lg={6} md={6} sm={12} xs={12}>
      <p className="fs-4 fw-bold mb-2 text-center">Recommended Meal Plans</p>
      </Col>
      {list.length &&
        list.map((item) => {
          return item ? (
            <Col lg={4} md={4} sm={6} xs={6} key={item.id} className="m-0 p-1">
              <MealCard product={item} handleNextStep={handleNextStep}/>
            </Col>
          ) : null;
        })}
    </Row>
  );
};

export default MealPlansList;