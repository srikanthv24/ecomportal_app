import React from "react";
import "./product-planner.scss";

const ProductDisplay = React.memo(
  ({ title, category, imageUrl, description, onClick }) => {
    return (
      <div className="product-display" onClick={onClick}>
        <div className="prdTitle">{title}</div>
        <div className="prdCategory">{category}</div>
        <img src={imageUrl} alt="product-img"></img>
        <div className="prdDesp">{description}</div>
      </div>
    );
  }
);

export default ProductDisplay;
