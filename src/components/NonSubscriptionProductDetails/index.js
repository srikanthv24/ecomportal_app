import React from "react";
import ProductDisplay from "../ProductPlanner/ProductDisplay";
import ProductAddToCartButtons from "../ProductAddToCartButtons";

const NonSubscriptionProductDisplay = ({
  productDetails,
  handleCartItem,
  cartLoading,
  cartUpdateLoading,
  existingProduct,
  onDecrement,
  onIncrement,
}) => {
  const {
    display_name: productTitle,
    category: productCategory,
    defaultimg_url: imageUrl,
    description: productDescription,
  } = productDetails;

  return (
    <>
    <section className="planner-container">
    <div className="product-planner">
      <ProductDisplay
        title={productTitle}
        category={productCategory}
        imageUrl={imageUrl}
        description={productDescription}
      />
      </div>
      </section>
      <ProductAddToCartButtons
        handleCartItem={handleCartItem}
        cartLoading={cartLoading}
        cartUpdateLoading={cartUpdateLoading}
        existingProduct={existingProduct}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
    </>
  );
};

export default NonSubscriptionProductDisplay;
