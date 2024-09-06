import React from "react";
import { BiRupee } from "react-icons/bi";
import { displayCurrency } from "../../helpers/displayCurrency";

const OrderCheckList = ({
  taxes,
  subTotal,
  grandTotal,
  deliveryCharges,
  discount,
}) => (
  <section className="cart-order-summery-container mb-5 w-100">
    <p class="cart-order-summery-header mb-0">INVOICE DETAILS</p>
    <ul className="cart-order-summery-list mb-0">
      <li>
        <p class="cart-order-summery-list-titles mb-0">Items Value</p>
        <p class="cart-order-summery-list-subtotal mb-0">
          <BiRupee />
          {displayCurrency(subTotal)}
        </p>
      </li>
      <li>
        <p class="cart-order-summery-list-titles mb-0">GST</p>
        <p class="cart-order-summery-list-subtotal mb-0">
          <BiRupee />
          {displayCurrency(taxes)}
        </p>
      </li>
      <li>
        <p class="cart-order-summery-list-titles mb-0">Delivery Charges</p>
        <p class="cart-order-summery-list-subtotal mb-0">
          <BiRupee />
          {displayCurrency(deliveryCharges)}
        </p>
      </li>
      <li>
        <p class="cart-order-summery-list-titles mb-0">Less Discount</p>
        <p class="cart-order-summery-list-discount mb-0"> -
          <BiRupee />
          {displayCurrency(discount)}
        </p>
      </li>
    </ul>
    <div class="flex justify-between px-3 py-2">
      <p class="cart-order-summery-list-total mb-0">Total Amount</p>
      <p class="cart-order-summery-list-total-price mb-0">
        <BiRupee />
        {displayCurrency(grandTotal)}
      </p>
    </div>
  </section>
);

export default OrderCheckList;
