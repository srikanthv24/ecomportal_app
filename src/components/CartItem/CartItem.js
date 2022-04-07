import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import QtyButtonGroup from "./QtyButtonGroup";
import "./cartItem.scss";
import { SESSION_TYPES, DELIVERY, DELIVER_TO } from "../../utils/constants";

const CartItem = ({
  isMealItem,
  imgUrl,
  productName,
  productIndex,
  itemId,
  quantity,
  loading,
  onQtyDecrement,
  onQtyIncrement,
  onDelete,
  isDelivery,
  duration,
  itemPrice,
  itemTax,
  itemDeliveryCharge,
  itemDiscount,
  itemGrandTotal,
  selectedSessions,
  address,
}) => {
  return (
    <div className="w-100p p-2">
      <Card className="my-1 bg-1">
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div className="cart-list-image-container">
            <img src={imgUrl} alt="img" />
          </div>
          <div>
            <p className="m-0 col-12 ff-4">Price: {itemPrice || 0.0}</p>
            <p className="m-0 col-12 ff-4">GST: {itemTax || 0.0}</p>
            <p className="m-0 col-12 ff-4">
              Delivery: {itemDeliveryCharge || 0.0}
            </p>
            <p className="m-0 col-12 ff-4">-Discount: {itemDiscount || 0.0}</p>
            <p className="m-0 col-12 ff-4">Total: {itemGrandTotal || 0.0}</p>
          </div>
        </Card.Body>
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          <div>
            <Card.Text className="cart-list-product-detailes-name mb-0 clr-black">
              {productName}
            </Card.Text>
            <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
              {duration}
            </p>
          </div>
          <div>
            <QtyButtonGroup
              productIndex={productIndex}
              itemId={itemId}
              quantity={quantity}
              loading={loading}
              onQtyDecrement={onQtyDecrement}
              onQtyIncrement={onQtyIncrement}
            />
          </div>
        </Card.Body>
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
          {isMealItem && (
            <>
              <div>
                <p
                  className={`cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary ${
                    selectedSessions?.includes("B") ? "" : "delete"
                  }`}
                >
                  {SESSION_TYPES.B}
                </p>
                <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
                  {isDelivery && selectedSessions?.includes("B")
                    ? DELIVERY
                    : ""}
                </p>
              </div>
              <div>
                <p
                  className={`cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary ${
                    selectedSessions?.includes("L") ? "" : "delete"
                  }`}
                >
                    {SESSION_TYPES.L}
                </p>
                <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
                  {isDelivery && selectedSessions?.includes("L")
                    ? DELIVERY
                    : ""}
                </p>
              </div>
              <div>
                <p
                  className={`cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary ${
                    selectedSessions?.includes("D") ? "" : "delete"
                  }`}
                >
                    {SESSION_TYPES.D}
                </p>
                <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
                  {isDelivery && selectedSessions?.includes("D")
                    ? DELIVERY
                    : ""}
                </p>
              </div>
            </>
          )}

          <div>
            <Button
              className="delete-button"
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(productIndex)}
            >
              <BsTrashFill />
            </Button>
          </div>
        </Card.Body>
        {isMealItem && isDelivery && (
          <Card.Footer className="cart-summary-footer">
            <p className="cart-list-product-detailes-despname m-0 col-12 ff-4 clr-secondary">
              {DELIVER_TO}
            </p>
            <p>{address}</p>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default CartItem;
