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
    duration,
    sid,
  }) => {
    return (
      <div className="product-display" onClick={onClick}>
        <div className="prdTitle">{title}</div>
        <div className="d-flex justify-content-between">
        <div className="prdCategory">{category}</div>
         { sid && sid!== "" &&  <div className="prdCategory">{`#${sid}`}</div> } 
        </div>
        <img src={imageUrl} alt="product-img"></img>
        {description && <div className="prdDesp">{description}</div>}
        {/* {duration && (
          <div className="prdDesp">Subscribed for {duration} day plan</div>
        )} */}
      </div>
    );
  }
);

export default ProductDisplay;
