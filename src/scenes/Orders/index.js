import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import DefaultImage from "./../../assets/default_thumbnail.png";
import moment from "moment";

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
    dispatch(getOrders({ customer_number: userDetails.phone_number.substring(3) }));
  }, []);

  return (
    <section className="bg-1" style={{minHeight:'calc(100vh - 126px)',padding: 5}}>
      <p className="h5 m-2 page-title">Subscription</p>
      {OrdersList?.length > 0 ?
        OrdersList?.map((order) => {
          return (
            <Card
              border="default"
              key={order.id} className="m-2"
              style={{
                // width: "100%",
                // padding: "10px 0px",
                // boxSizing: "border-box",
                // margin: 10,
              }}
            >
              <div className="contaner" style={{padding:'0px 12px'}}>
                <Row className="bg-1"
                // style={{
                //   marginLeft: 0,
                //   marginRight: 0,
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
              >
                <Col xs={3}>
                  <div>
                    <img
                      alt="img"
                      src={order?.product?.defaultimg_url || DefaultImage}
                      style={{ height: 60, borderRadius: "50%" }}
                    />
                  </div>
                </Col>
                <Col xs={9}>
                  <span className="h6 ff-2">{order?.product?.display_name}</span>
                  <p className="text-muted ff-4">{order?.product?.category}</p>
                </Col>
              </Row>
              <Row style={{backgroundColor: '#F5E0BC'}}>
                <Col className="py-2">
                  <small className="fs-8 text-muted ff-4">Order date:</small>
                  <br />
                  <small className="ff-4">
                    <b>{moment(order?.start_date).format("ll")}</b>
                  </small>
                </Col>
                {order?.start_date ? (
                 <Col className="py-2">
                    <small className="fs-8 text-muted ff-4">Finish date:</small>
                    <br />
                    <small className="ff-4">
                      <b>{moment(order?.finish_date).format("ll")}</b>
                    </small>
                  </Col>
                ) : null}
              </Row>
              </div>
            </Card>
          );
        }) :<small className="text-muted value-txt px-2">No Orders</small>}
    </section>
  );
};

export default Orders;
