import React from "react";
import "./product-planner.scss";
import { getDateInTextFormat } from "../../utils/dateUtils";

const ProductDisplay = React.memo(
  ({
    title,
    category,
    imageUrl,
    description,
    onClick,
    planName,
    subscriptionStartDate,
    duration
  }) => {
    return (
      <div className="product-display" onClick={onClick}>
        <div className="prdTitle">{title}</div>
        <div className="prdCategory">{category}</div>
        <img src={imageUrl} alt="product-img"></img>
        <div className="prdDesp">{description}</div>
        <div className="prdDesp">Subscribed for {duration} day plan</div>
        <div className="prdDesp">Start date: {getDateInTextFormat(subscriptionStartDate)}</div>
      </div>
    );
  }
);

export default ProductDisplay;
