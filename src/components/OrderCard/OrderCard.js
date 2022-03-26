import React from "react";
import moment from "moment";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import DefaultImage from "./../../assets/default_thumbnail.png";
import { useHistory } from "react-router";

const OrderCard = ({ordersList, cancelSubscription}) => {
    const history = useHistory();
return(<section
    className="bg-1"
    style={{ minHeight: "calc(100vh - 0px)", padding: "100px 5px 0px", position:'relative'}}
  >
    <p className="h5 m-2 page-title">Subscription</p>
    {ordersList?.length > 0 ? (
      ordersList?.map((order,index) => {
        return (
          <Card
            border="default"
            key={order.id} className="m-2"
            style={{ border:'none', boxShadow:'none', background:'transparent'
            }}
          >
            <div className="contaner" style={{padding:'0px 12px'}}>
              <Row className="bg-1"
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
              <Col xs={5}>
                <span className="h6">{order?.product?.display_name}</span>
                <p className="text-muted text-elipses">{order?.product?.category}</p>
              </Col>
              <Col xs={4}>
              <span className="h6" style={{whiteSpace:'nowrap'}}>Paid Amount</span>
              <p className="text-muted text-elipses">{order?.paid_amount|| 0}</p>
                 
              </Col>

            </Row>
                <div className="row">
                <section className="order-summary-sec">
                  <div className="orders-info">
                    <>
                      <div className="">
                        <small className="fs-10 text-muted">Order date</small>
                        <br />
                        <small className="ff-4">
                          <b>{moment(order?.start_date).format("ll")}</b>
                        </small>
                      </div>
                      {order?.start_date ? (
                      <div>
                        <small className="fs-10 text-muted">Finish date</small>
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
                            {ordersList[index]?.orderscount[0]?.meals_consumed}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[0]?.meals_ordered}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[0]?.meals_pausedORcancelled}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[0]?.meals_remaining}
                        </Badge>
                      </td>
                  </tr>
                  <tr>
                      <td>L</td>
                      <td>
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[1]?.meals_consumed}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[1]?.meals_ordered}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[1]?.meals_pausedORcancelled}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[1]?.meals_remaining}
                        </Badge>
                      </td>
                  </tr>
                  <tr>
                      <td>D</td>
                      <td>
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[2]?.meals_consumed}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[2]?.meals_ordered}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[2]?.meals_pausedORcancelled}
                        </Badge>
                      </td>
                      <td>
                        {" "}
                        <Badge pill bg="dark">
                            {ordersList[index]?.orderscount[2]?.meals_remaining}
                        </Badge>
                      </td>
                  </tr>
                </table>
                  </div>
                </section>
                </div>


            <Row style={{ backgroundColor: "#efefef",maxWidth : "360px", display:"none" }}>
              <Col xs={4}>
                <small className="fs-10 text-muted">Order date</small>
                <br />
                <small className="ff-4">
                  <b>{moment(order?.start_date).format("ll")}</b>
                </small>
                {order?.start_date ? (
                <Col>
                  <small className="fs-10 text-muted">Finish date</small>
                  <br />
                  <small className="ff-4">
                    <b>{moment(order?.finish_date).format("ll")}</b>
                  </small>
                </Col>
              ) : null}
              </Col>
              
              <Col xs={8} style={{padding :"0",margin :"0"}}>
                <small style={{marginTop : "20px"}}>
                  <Row>
                    <Col style={{marginLeft : "10px"}}>
                        C
                      </Col>
                    <Col>O</Col>
                    <Col>P/C</Col>
                    <Col>R</Col>
                  </Row>
                  <Row>
                    B
                    <Col>
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[0]?.meals_consumed}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[0]?.meals_ordered}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[0]?.meals_pausedORcancelled}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[0]?.meals_remaining}
                      </Badge>
                    </Col>
                  </Row>
                  <Row>L
                  <Col>
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[1]?.meals_consumed}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[1]?.meals_ordered}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[1]?.meals_pausedORcancelled}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[1]?.meals_remaining}
                      </Badge>
                    </Col>
                  </Row>
                  <Row>D
                  <Col>
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[2]?.meals_consumed}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[2]?.meals_ordered}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[2]?.meals_pausedORcancelled}
                      </Badge>
                    </Col>
                    <Col>
                      {" "}
                      <Badge pill bg="dark">
                      {ordersList[index]?.orderscount[2]?.meals_remaining}
                      </Badge>
                    </Col>
                  </Row>
                </small>
              </Col>
            </Row>
            
            </div>
            <div className="orders__footer">
              <Button variant="secondary" size="sm">Pause</Button>
              <Button variant="secondary" size="sm" onClick={() =>
                cancelSubscription(order.id)
              }>Cancel Subscrition</Button>
            </div>
          </Card>
        );
      })
    ) : (
      <small className="text-mut`ed value-txt px-2">No Orders</small>
    )}
    <button className="w-100 bg-chocolate-900 btn btn-primary" style={{position:'absolute',bottom:'0px',left:'0'}} onClick={() => history.push("/")}>Go To Home</button>
  </section>)
}

export default OrderCard;