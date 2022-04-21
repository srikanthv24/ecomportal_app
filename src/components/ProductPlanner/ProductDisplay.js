import React from "react";
import "./product-planner.scss";

const ProductDisplay = React.memo(
  ({
    title,
    category,
    imageUrl,
    description,
    onClick,
    planName,
    firstDeliveryDate,
    duration
  }) => {
    return (
      <div className="product-display" onClick={onClick}>
        <div className="prdTitle">{title}</div>
        <div className="prdCategory">{category}</div>
        <img src={imageUrl} alt="product-img"></img>
        <div className="prdDesp">{description}</div>
        <div className="prdDesp">Subscribed for {duration} day plan</div>
        <div className="prdDesp">First delivery date: {firstDeliveryDate}</div>
      </div>
    );
  }
);

export default ProductDisplay;
