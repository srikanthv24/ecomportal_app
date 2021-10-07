import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import DefaultImage from "./../../assets/default_thumbnail.png";

const Orders = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);
  const OrdersList = useSelector((state) => state.Orders.ordersList);
  const order_list = [
    {
      defaultimg_url:
        "https://portalimg.s3.amazonaws.com/products/image_cb5252ea-be8d-40ae-8b79-6f800c1dd05c_1024x1024@2x.jpg",
      item_name: "Pistachios 100g",
      tax_methods: "GST12OUTPUT",
      uom_name: "NOS",
      category: "Dried Fruits, Nuts & Seeds",
      item_id: "aa9726fd-f67b-47e7-956d-8af0217916bc",
      qty: 3,
      sale_val: 500,
      subscription: [],
      variants: [],
    },
  ];

  useEffect(() => {
    console.log("OrdersListOrdersList", OrdersList);
  }, [OrdersList]);

  useEffect(() => {
    // dispatch(getOrders({ customer_number: userDetails.phone_number.substring(3) }));
    dispatch(getOrders({ customer_number: "6300275771" }));
  }, []);

  return (
    <section style={{ padding: 5 }}>
      <p className="h5 m-2">Your Orders</p>
      {OrdersList.map((order) => {
        return (
          <Card
            border="light"
            key={order.id}
            style={{ width: "100%", boxSizing: "border-box" }}
          >
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
              <Col xs={4}>
                <div>
                  <img
                    alt="img"
                    src={order?.product?.defaultimg_url || DefaultImage}
                    style={{ height: 100, borderRadius: "50%" }}
                  />
                </div>
              </Col>
              <Col xs={8}>
                <span className="h6">{order?.product?.display_name}</span>
                <p className="text-muted">{order?.product?.category}</p>
              </Col>
            </Row>
          </Card>
        );
      })}
    </section>
  );
};

export default Orders;
