import React from "react";

export const Checkout = ({subTotal, deliveryCharges, grandTotal}) => {
  return (
    <section className="mt-4" style={{ display: "none" }}>
      <span className="d-flex justify-content-between align-items-center">
        <p>Sub-total</p>
        <p>
          <BiRupee /> {displayCurrency(subTotal)}
        </p>
      </span>
      <span className="d-flex justify-content-between align-items-center">
        <p>Delivery Charges</p>
        <p>
          <BiRupee />
          {displayCurrency(deliveryCharges)}
        </p>
      </span>
      <span className="d-flex justify-content-between align-items-center">
        <p className="fw-bold">Total</p>
        <p className="fw-bold">
          <BiRupee />
          {displayCurrency(grandTotal)}
        </p>
      </span>
    </section>
  );
};
