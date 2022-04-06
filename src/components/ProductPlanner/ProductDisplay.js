import React from "react";

const ProductDisplay = React.memo(
  ({ title, category, imageUrl, description, onClick }) => {
    return (
      <div className="product-display" onClick={onClick}>
        <div>{title}</div>
        <div>{category}</div>
        <img url={imageUrl}></img>
        <div>{description}</div>
      </div>
    );
  }
);

export default ProductDisplay;
