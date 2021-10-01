import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const Orders = () => {
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

  return (
    <section style={{ padding: 5 }}>
      <p className="h5 m-2">Your Orders</p>
      {order_list.map((order) => {
        return (
          <Card border="light">
            <Row>
              <Col xs={3}>
                <div>
                  <img alt="img" src={order.defaultimg_url} style={{height: 100, borderRadius: '50%'}} />
                </div>
              </Col>
              <Col xs={9}>
                <span className="h6">{order.item_name}</span>
                <p className="text-muted">{order.category}</p>
              </Col>
            </Row>
          </Card>
        );
      })}
    </section>
  );
};

export default Orders;
