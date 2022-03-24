import React from 'react';

import { Button, Card } from "react-bootstrap";
import { FaChevronLeft, FaWeight, FaLeaf, FaRegGrinHearts } from 'react-icons/fa';

import './ChooseGoalStyles.css';

const Goals = [
    {
        name: "Manage My Weight",
        value:"MANAGEMYWEIGHT",
        icon: <FaWeight />
    },
    {
        name: "Detox My Body",
        value:"DETOXMYBODY",
        icon: <FaLeaf />
    },
    {
        name: "Have Delicious Healthy Food",
        value: "HEALTHYFOOD",
        icon: <FaRegGrinHearts />
    }
];

const GoalCard = ({ name, icon, onClick, isSelected }) => (
    <Card onClick={() => onClick()} className={`goal-card${isSelected? ' bg-success' : ''}`}>
        <Card.Body>
            {icon}
            <Card.Title className={`text-center m-0 py-2${isSelected? ' text-white' : ''}`}>
                {name}
            </Card.Title>
        </Card.Body>
    </Card>    
);

const ChooseGoal = ({ handleBack, handleNextStep, selectedGoal, setGoal }) => {
    const handleClick = goal => {
        setGoal(goal.value);
        handleNextStep();
    };

    return (
        <section style={{ background: "rgb(249, 243, 223)" }}>
            <p className="fs-4 fw-bold mb-3 text-center page-title">What is my Goal?</p>
            <div className="goal-container">
                {
                    Goals.map(goal =>
                        <GoalCard
                            key={goal}
                            name={goal.name}
                            icon={goal.icon}
                            onClick={() => handleClick(goal)}
                            isSelected={selectedGoal === goal.name}
                        />
                    )
                }
            </div>
            <div className="footer-button-wrap">
                <Button onClick={() => handleBack()} variant="secondary">
                    <FaChevronLeft />
                    BACK
                </Button>
            </div>
        </section>
    );
};

export default ChooseGoal;
