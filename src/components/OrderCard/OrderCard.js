import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import DefaultImage from "./../../assets/default_thumbnail.png";
import MoreIcon from "./../../assets/more.png";
import StartTimeIcon from "./../../assets/start-time.png";
import EndTimeIcon from "./../../assets/end-time.png";
import { useHistory } from "react-router";
import { BiRupee } from "react-icons/bi";
import { displayCurrency } from "../../helpers/displayCurrency";
import { SERVICE_TYPE, COMPLETED } from "../../utils/constants";
import _ from "underscore";
import MenuList from "../MenuList/MenuList";



const OrderCard = ({ ordersList, cancelSubscription, onMenuSelect }) => {
  const history = useHistory();
  return (
    <section
      className="vl-bg-1 vl-orders-wrapper"
      style={{
        minHeight: "calc(100vh - 0px)",
        padding: "70px 20px 60px",
        position: "relative",
      }}
    >
      <div className="w-100p d-flex justify-content-between align-items-center">
        <p className="h5 m-2 page-title">Subscription</p>
      </div>

      {ordersList?.length > 0 ? (
        ordersList?.map((order, index) => {
          return (
            <Card
              border="default"
              key={order.id}
              className="mb-3"
              style={{
                border: "none",
                boxShadow: "none",
                background: "transparent",
              }}
            >
              <div className="orders-info-3 w-100p">
                <div className="w-100p d-flex justify-content-between align-items-center">
                  <h4 className="subs-id mb-0"># {order.id}</h4>
                  <div className="more-info">
                    <>
                      {moment(moment()).isAfter(order.finish_date) ? (
                        <Badge bg="success">{COMPLETED}</Badge>
                      ) : (
                        <div className="d-flex">
                          <div className="mx-4">
                          <Button variant="outlined" disabled={order?.tomorrows_delivery ? false : true }  className="p-0" onClick={() => onMenuSelect(SERVICE_TYPE.PAUSE_TOMORROW, order.id)}>
                            <i class={`fa-solid fa-pause ${order?.tomorrows_delivery ? "pause-btn-active" : "pause-btn-disable"}`}></i>
                          </Button>
                          </div>
                          <Link to={`/order/${order.cart_id}/${order.cartitem_id}/${order.id}`} className="pause-btn-active d-flex align-items-center">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link> 
                        </div>
                      )}
                    </>
                  </div>
                </div>
                <div className="w-100p d-flex justify-content-between align-items-start my-1">
                  <h4 className="prd-item mb-0">
                    {" "}
                    <span>{order?.product?.display_name}</span>
                    <p className="text-muted text-elipses mb-0">
                      {order?.product?.category}
                    </p>
                  </h4>
                  <h4 className="prd-item mb-0" >
                    <span  className="amount-info">
                    <BiRupee />
                    {displayCurrency(order?.paid_amount) || 0}
                    </span>
                    <p className="d-flex justify-content-end mb-0">
                    <Badge className="badge-bg-secondary">{`${order?.duration ? order?.duration : 0} Days`}</Badge>
                    </p>
                  </h4>
                </div>
                <div className="w-100p d-flex justify-content-between mt-1">
                  <div className="date-info">
                    <img src={StartTimeIcon} alt="icon" height="18" />
                    <span>{moment(order?.start_date).format("ll")}</span>
                  </div>
                  <div className="date-info">
                    <img src={EndTimeIcon} alt="icon" height="18" />
                    <span>{moment(order?.finish_date).format("ll")}</span>
                  </div>
                </div>
                <div className="sub-result-info mt-1">
                  <table className="order-details-table">
                    <tr>
                      <td></td>
                      <td className="food-info-txt">Delivered</td>
                      <td className="food-info-txt">Scheduled</td>
                      <td className="food-info-txt">Balance</td>
                    </tr>
                    <tr>
                      <td className="food-info-txt">Breakfast</td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[0]?.meals_consumed}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[0]?.meals_remaining}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[0]?.meals_ordered !== 0 ? order?.duration - order?.orderscount[0]?.meals_ordered : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="food-info-txt">Lunch</td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[1]?.meals_consumed}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[1]?.meals_remaining}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                        {order?.orderscount[1]?.meals_ordered !== 0 ? order?.duration - order?.orderscount[1]?.meals_ordered : 0}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="food-info-txt">Dinner</td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[2]?.meals_consumed}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                          {order?.orderscount[2]?.meals_remaining}
                        </span>
                      </td>
                      <td>
                        <span className="order-info-txt">
                        {order?.orderscount[2]?.meals_ordered !== 0 ? order?.duration - order?.orderscount[2]?.meals_ordered : 0}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <section style={{ padding: "0px 12px", display: "none" }}>
                <div
                  className="contaner"
                  style={{ padding: "0px 12px", display: "none" }}
                >
                  <Row className="bg-1">
                    <Col xs={3}>
                      <div>
                        <img
                          alt="img"
                          src={order?.product?.defaultimg_url || DefaultImage}
                          style={{ height: 60, borderRadius: "50%" }}
                        />
                      </div>
                    </Col>
                    <Col xs={5}>
                      <span className="h6">{order?.product?.display_name}</span>
                      <p className="text-muted text-elipses">
                        {order?.product?.category}
                      </p>
                    </Col>
                    <Col xs={4}>
                      <span className="h6" style={{ whiteSpace: "nowrap" }}>
                        Paid Amount
                      </span>
                      <p className="text-muted text-elipses">
                        {order?.paid_amount || 0}
                      </p>
                    </Col>
                  </Row>
                  <div className="row">
                    <section className="order-summary-sec">
                      <div className="orders-info">
                        <>
                          <div className="">
                            <small className="fs-10 text-muted">
                              Order date
                            </small>
                            <br />
                            <small className="ff-4">
                              <b>{moment(order?.start_date).format("ll")}</b>
                            </small>
                          </div>
                          {order?.start_date ? (
                            <div>
                              <small className="fs-10 text-muted">
                                Finish date
                              </small>
                              <br />
                              <small className="ff-4">
                                <b>{moment(order?.finish_date).format("ll")}</b>
                              </small>
                            </div>
                          ) : null}
                        </>
                      </div>
                      <div className="orders-details">
                        <table>
                          <tr>
                            <td></td>
                            <td>C</td>
                            <td>O</td>
                            <td>P/C</td>
                            <td>R</td>
                          </tr>
                          <tr>
                            <td>B</td>
                            <td>
                              <Badge pill bg="dark">
                                {order?.orderscount[0]?.meals_consumed}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[0]?.meals_ordered}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[0]?.meals_pausedORcancelled}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[0]?.meals_remaining}
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <td>L</td>
                            <td>
                              <Badge pill bg="dark">
                                {order?.orderscount[1]?.meals_consumed}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[1]?.meals_ordered}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[1]?.meals_pausedORcancelled}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[1]?.meals_remaining}
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <td>D</td>
                            <td>
                              <Badge pill bg="dark">
                                {order?.orderscount[2]?.meals_consumed}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[2]?.meals_ordered}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[2]?.meals_pausedORcancelled}
                              </Badge>
                            </td>
                            <td>
                              {" "}
                              <Badge pill bg="dark">
                                {order?.orderscount[2]?.meals_remaining}
                              </Badge>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </section>
                  </div>

                  <Row
                    style={{
                      backgroundColor: "#efefef",
                      maxWidth: "360px",
                      display: "none",
                    }}
                  >
                    <Col xs={4}>
                      <small className="fs-10 text-muted">Order date</small>
                      <br />
                      <small className="ff-4">
                        <b>{moment(order?.start_date).format("ll")}</b>
                      </small>
                      {order?.start_date ? (
                        <Col>
                          <small className="fs-10 text-muted">
                            Finish date
                          </small>
                          <br />
                          <small className="ff-4">
                            <b>{moment(order?.finish_date).format("ll")}</b>
                          </small>
                        </Col>
                      ) : null}
                    </Col>

                    <Col xs={8} style={{ padding: "0", margin: "0" }}>
                      <small style={{ marginTop: "20px" }}>
                        <Row>
                          <Col style={{ marginLeft: "10px" }}>C</Col>
                          <Col>O</Col>
                          <Col>P/C</Col>
                          <Col>R</Col>
                        </Row>
                        <Row>
                          B
                          <Col>
                            <Badge pill bg="dark">
                              {order?.orderscount[0]?.meals_consumed}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[0]?.meals_ordered}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[0]?.meals_pausedORcancelled}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[0]?.meals_remaining}
                            </Badge>
                          </Col>
                        </Row>
                        <Row>
                          L
                          <Col>
                            <Badge pill bg="dark">
                              {order?.orderscount[1]?.meals_consumed}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[1]?.meals_ordered}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[1]?.meals_pausedORcancelled}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[1]?.meals_remaining}
                            </Badge>
                          </Col>
                        </Row>
                        <Row>
                          D
                          <Col>
                            <Badge pill bg="dark">
                              {order?.orderscount[2]?.meals_consumed}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[2]?.meals_ordered}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[2]?.meals_pausedORcancelled}
                            </Badge>
                          </Col>
                          <Col>
                            {" "}
                            <Badge pill bg="dark">
                              {order?.orderscount[2]?.meals_remaining}
                            </Badge>
                          </Col>
                        </Row>
                      </small>
                    </Col>
                  </Row>
                </div>
              </section>
            </Card>
          );
        })
      ) : (
        <small className="text-mut`ed value-txt px-2">No Orders</small>
      )}
      <button
        className="w-100 vl-custom-btn"
        style={{ position: "absolute", bottom: "0px", left: "20px", maxWidth:'calc(100% - 40px)' }}
        onClick={() => history.push("/")}
      >
        Go To Home
      </button>
    </section>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  const { ordersList: ordersListInPrev } = prevProps;
  const { ordersList: ordersListInNext } = nextProps;
  return _.isEqual(_.sortBy(ordersListInPrev), _.sortBy(ordersListInNext));
};

export default React.memo(OrderCard, arePropsEqual);
