import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Form
} from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getMealPlanDetails } from "../../store/actions/mealPlans";
//import 'react-date-range/dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file
//import { DateRange  } from 'react-date-range';
import Select from 'react-select';
import ProductPlanner from "./product-planner";


const MealPlanDetails = ({ id, handleNextStep, handleBack }) => {
  const dispatch = useDispatch();
  const mealPlanDetails = useSelector(state => state.mealPlans.details);
  const custId = useSelector(state => state.customer.customerId);
  const mealPlanId = useSelector(state => state.mealPlans.mealPlanId);

  const [mealPlan, setMealPlan] = useState({});
  const [ variant, setVariant ] = useState([]);
  const [CartItem, setCartItem] = useState(0);
  const [ hide, setHide ] = useState(true);
                  
  useEffect(() => {
    dispatch(getMealPlanDetails(mealPlanId));
  }, []);

  useEffect(() => {
    setMealPlan(mealPlanDetails);
    setVariant(mealPlanDetails.variant);
  }, [mealPlanDetails]);

  // console.log("loading state", products);
  console.log("product view by id::::", mealPlanDetails);
  //  console.log("variant::", variant)
  return (
    <Container fluid >
      <Row>
        <Col sm={12} lg={6}>
        <h2 className="text-left">{mealPlanDetails.display_name}</h2>
        <p className={`text-muted my-0 ${hide ? 'text-truncate' : '' }`}>{mealPlanDetails.description} </p>
        <p className="text-end" onClick={() => setHide(!hide)} style={{color: "#f05922"}}>view {`${hide? 'more...' : 'less'}`}</p>
        </Col>
        <Col sm={12} lg={6}>
          <img
            src={
              mealPlanDetails.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            }
            width="100%"
            height="300px"
          />
          </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} lg={6} className="d-flex mt-3">
              <h1 className="text-start fs-5">
              <BiRupee />{mealPlanDetails.saleprice} / {mealPlanDetails.uom_name}
              </h1>
            </Col>
          </Row> 
          <Row>
          <Col>
              {mealPlanDetails.is_mealplan && <ProductPlanner
                //customerId={custId}
                // customerId= "578461ea-bc50-4d40-8c0a-5c4546abc2d7"
                //productId={mealPlanId}
                // data={products.mealPlanDetails}
                handleBack={handleBack}
                handleNextStep={handleNextStep}
              />}
          </Col>
          </Row>
    </Container>
  );
};

export default MealPlanDetails;