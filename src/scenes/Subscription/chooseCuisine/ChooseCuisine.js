import React, { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import "./ChooseCuisineStyles.css";
import CuisineImg from "../../../assets/meal.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { getMealPlans } from "../../../store/actions/mealPlans";

const CuisineCard = ({ name, onClick, isSelected, CuisineSrc }) => (
  <Card
    onClick={() => onClick()}
    className={`cuisine-card${isSelected ? " bg-success" : ""}`}
  >
    {/* <Card.Img
            variant="top"
            src={CuisineSrc}

        /> */}
    <div className="prd-image-thumbnile prd-image-thumbnile-none">
      <img src={CuisineSrc || CuisineImg} alt="img" className="subimg" />
    </div>
    <Card.Body>
      <Card.Title
        className={`text-center m-0 py-1${isSelected ? " text-white" : ""}`}
      >
        {name}
      </Card.Title>
    </Card.Body>
  </Card>
);

const ChooseCuisine = ({ handleNextStep, selectedCuisine, setCuisine }) => {
  const dispatch = useDispatch();
  const { mealPlansList: list, loading } = useSelector(
    (state) => state.mealPlans
  );
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
