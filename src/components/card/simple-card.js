import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { IoCloseOutline, IoNotifications } from "react-icons/io5";
import { BiRupee } from "react-icons/bi";
import "./styles.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const SimpleCard = () => {
  const [show, setShow] = useState(false);
  const OrdersList = useSelector((state) => state.Orders.ordersList);

  const GetSubscriptions = () => {
    for (let i = 0; i < 2; i++) {
      const order = OrdersList[i];
      console.log('OrdersList[i]', OrdersList[i])
      return (
        <div className="d-inline-flex align-items-center justify-content-between w-100 mb-2">
          <div className="d-inline-flex align-items-center">
            <div className="avatar h4 me-3">
              {order.customer.display_name.charAt(0)}
            </div>
            <div>
              <span className="h6 fw-normal ff-2">
                {order.customer.display_name}
              </span>
              <div
                className="text-muted ff-3"
                style={{
                  overflow: "wrap",
                  wordBreak: "break-word",
                  fontSize: 12,
                }}
              >
                {moment(order.start_date).format("ll")} to{" "}
                {moment(order.finish_date).format("ll")}
              </div>
            </div>
          </div>
          <div>
            <span className="fw-bold" style={{ fontSize: 14 }}>
              <BiRupee /> {order.amount || "0.00"}
            </span>
          </div>
        </div>
      );
    }
  };

  if (OrdersList && OrdersList.length !== 0) {
    return (
      <Card className="subscription-section bg-1">
        <Card.Header className="content-title no-bg">
          <div className="d-flex justify-content-between align-items-center ff-1">
            Subscriptions
            <Link to="/orders/" className="viewmore-txt ff-1">
              View all
            </Link>
          </div>
        </Card.Header>

        <Card.Body>
          {show && (
            <div className="d-flex align-items-center justify-content-between text-danger">
              <p>
                <IoNotifications /> Renew the subscription ending in 5 days.
              </p>
              <p onClick={() => setShow(false)}>
                <IoCloseOutline />
              </p>
            </div>
          )}
          {/* {OrdersList?.map((order) => {
            return;
          })} */}
          <GetSubscriptions />
        </Card.Body>
      </Card>
    );
  }
  return null;
};

export default SimpleCard;
