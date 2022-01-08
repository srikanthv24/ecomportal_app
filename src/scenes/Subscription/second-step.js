import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMealPlans } from "../../store/actions/mealPlans";
//import { getProductsAction } from "../../store/actions/products";
import MealPlansList from "./mealplan-list";

const MealPlans = ({handleNextStep}) => {
  //let catId = query.get("category");
  const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);
const mealPlans = useSelector( state => state.mealPlans);

  useEffect(() => {
    // let filter = { category: { eq: catId } };
    // dispatch(getProductsAction(catId ? {filter: filter} : 0));
    // console.log("catId", catId);
    dispatch(getMealPlans());
  }, []);


  console.log("meal plans list:::", mealPlans.mealPlansList);

  return (
    <>
      <Container fluid className="bg-1">
        <Row style={{ overflow: "auto" }}>
          <Col
            xs={12}
            lg={9}
            style={{ overflow: "auto", paddingTop: 20, paddingBottom: 20 }}
          >
            <Row>
              <MealPlansList list={mealPlans.mealPlansList} handleNextStep={handleNextStep}/>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MealPlans;