import React, { useEffect } from "react";
import { Card, Spinner  } from "react-bootstrap";
import "./ChooseCuisineStyles.css";
import CuisineImg from "../../../assets/meal.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getMealPlans } from "../../../store/actions/mealPlans";

const CuisineCard = ({ name, onClick, isSelected, CuisineSrc }) => (
   <Card
   style={{
     marginBottom: 30,
     borderColor: "transparent",
     padding: "0px",
     background: "transparent",
   }}
   onClick={() => onClick()}
className={`cuisine-card${isSelected ? " bg-success" : ""}`}
  
 >
   <Card.Body
     variant="top"
     className="p-2"
   >
     <div className="prd-image-thumbnile">
       <img src={ CuisineSrc|| CuisineImg} alt="img" />
     </div>
   </Card.Body>
   <Card.Body
     className="pt-1 text-center px-1"
     style={{ minHeight: 40 }}
   >
     <Card.Text
       className="h6 mb-0 pb-0 col-12 text-truncate text-center"
       style={{
         fontSize: "15px",
         lineHeight: "25px",
         fontWeight: "700",
         color: "#352817",
         fontFamily: "Roboto Condensed",
       }}
     >
       {name}
     </Card.Text>
   </Card.Body>
 </Card>
);

const ChooseCuisine = ({ handleNextStep, selectedCuisine, setCuisine }) => {
  const dispatch = useDispatch();
  const { mealPlansList: list, loading } = useSelector((state) => state.mealPlans);
  const handleClick = (cuisineId) => {
    setCuisine(cuisineId);
    handleNextStep();
  };

  useEffect(() => {
    dispatch(getMealPlans());
  }, []);

  return (
    <section style={{ background: "rgb(249, 243, 223)" }}>
      <p className="fs-4 fw-bold mb-3 text-center page-title">
        Choose My Cuisine
      </p>
      <div className="cuisine-container">
      {loading && <Spinner className="cuisine-spinner" animation="border" />}
        {list &&
          list.length > 0 &&
          list.map((cuisine) => (
            <CuisineCard
              key={cuisine.id}
              isSelected={selectedCuisine === cuisine.id}
              onClick={() => handleClick(cuisine.id)}
              name={cuisine.display_name}
              CuisineSrc={cuisine.defaultimg_url}
            />
          ))}
      </div>
    </section>
  );
};

export default ChooseCuisine;
