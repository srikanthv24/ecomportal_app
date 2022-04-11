import React from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { ADD_TO_CART } from "../../utils/constants";
import "./productAddToCartButtons.scss";

const ProductAddToCartButtons = ({
  handleCartItem,
  cartLoading,
  cartUpdateLoading,
  existingProduct,
  onDecrement,
  onIncrement,
}) => {
  return (
    <>
      {existingProduct?.item?.qty ? (
        <InputGroup className="w-100p single-prd-add-cart-btn">
          <Button
            className="qty-btn"
            variant="outline-secondary"
            onClick={onDecrement}
            size="sm"
          >
            <GrSubtract />
          </Button>
          <FormControl
            className="qty-input"
            disabled={true}
            value={existingProduct?.item?.qty || 0}
          />
          <Button
            variant="outline-secondary"
            className="qty-btn"
            onClick={onIncrement}
            size="sm"
          >
            <GrAdd />
          </Button>
        </InputGroup>
      ) : (
        <Button
          className="w-100p custom-primary-btn single-prd-add-cart-btn"
          onClick={handleCartItem}
        >
          <AiOutlineShoppingCart />
          {cartLoading || cartUpdateLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            ADD_TO_CART
          )}
        </Button>
      )}
    </>
  );
};

export default ProductAddToCartButtons;
