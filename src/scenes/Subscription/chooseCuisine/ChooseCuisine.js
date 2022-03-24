import React from 'react';

import { Card } from "react-bootstrap";

import './ChooseCuisineStyles.css';

import CuisineSrc from '../../../assets/meal.jpeg';

const cuisines = [
    "Comfort Home Food",
    "Fusion Vegan",
    "Salads & Soups Only",
    "Just Juices & Smoothies"
];

const CuisineCard = ({ name, onClick, isSelected }) => (
    <Card onClick={() => onClick()} className={`cuisine-card${isSelected? ' bg-success' : ''}`}>
        <Card.Img
            variant="top"
            src={CuisineSrc}
        />
        <Card.Body>
            <Card.Title className={`text-center m-0 py-1${isSelected? ' text-white' : ''}`}>
                {name}
            </Card.Title>
        </Card.Body>
    </Card>
);

const ChooseCuisine = ({ handleNextStep, selectedCuisine, setCuisine }) => {
    const handleClick = cuisine => {
        setCuisine(cuisine);
        handleNextStep();
    };

    return (
        <section style={{ background: "rgb(249, 243, 223)" }}>
            <p className="fs-4 fw-bold mb-3 text-center page-title">Choose My Cuisine</p>
            <div className="cuisine-container">
                {
                    cuisines.map(cuisine =>
                        <CuisineCard
                            key={cuisine}
                            isSelected={selectedCuisine === cuisine}
                            onClick={() => handleClick(cuisine)}
                            name={cuisine}
                        />
                    )
                }
            </div>
        </section>
    );
};

export default ChooseCuisine;
