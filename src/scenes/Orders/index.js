import React, { useEffect } from "react";
import { Badge, Button, Card, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/actions/orders";
import DefaultImage from "./../../assets/default_thumbnail.png";
import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Orders = () => {
  const history = useHistory();
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
    dispatch(
      getOrders({ customer_number: userDetails.phone_number.substring(3) })
    );
  }, []);

  console.log("oooo",OrdersList)

  return (
    <section
      className="bg-1"
      style={{ minHeight: "calc(100vh - 0px)", padding: "100px 5px 0px", position:'relative'}}
    >
      <p className="h5 m-2 page-title">Subscription</p>
      {/* <Row
        style={{
          marginLeft: 0,
          marginRight: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={6}>
          <div>RS: 0.00</div>
        </Col>
        <Col xs={6}>
          <span className="h6"> RS:0.00 </span>
        </Col>
      </Row> */}
      {OrdersList?.length > 0 ? (
        OrdersList?.map((order,index) => {
          return (
            <Card
              border="default"
              key={order.id} className="m-2"
              style={{ border:'none', boxShadow:'none', background:'transparent'
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
                <Col xs={5}>
                  <span className="h6">{order?.product?.display_name}</span>
                  <p className="text-muted text-elipses">{order?.product?.category}</p>
                </Col>
                <Col xs={4}>
                <span className="h6" style={{whiteSpace:'nowrap'}}>Paid Amount</span>
                <p className="text-muted text-elipses">{order?.paid_amount|| 0}</p>
                   
                </Col>

              </Row>
              {/* <OverlayTrigger
										trigger="hover"
										key="lunch"
										placement={"bottom"}
										overlay={
											<Popover id="lunch">
												<Popover.Header as="h3">Menu</Popover.Header>
												<Popover.Body>
                        C : COnsumed
                        O: Ordered 
                        P/C : Pause or Cancelled
                        R : Remaining
                        </Popover.Body>
											</Popover>
										}
									>
										<Button variant="transparent">
											<BsInfoCircle />
										</Button>
									</OverlayTrigger> */}
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
            {OrdersList[index]?.orderscount[0]?.meals_consumed}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[0]?.meals_ordered}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[0]?.meals_pausedORcancelled}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[0]?.meals_remaining}
         </Badge>
      </td>
   </tr>
   <tr>
      <td>L</td>
      <td>
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[1]?.meals_consumed}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[1]?.meals_ordered}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[1]?.meals_pausedORcancelled}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[1]?.meals_remaining}
         </Badge>
      </td>
   </tr>
   <tr>
      <td>D</td>
      <td>
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[2]?.meals_consumed}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[2]?.meals_ordered}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[2]?.meals_pausedORcancelled}
         </Badge>
      </td>
      <td>
         {" "}
         <Badge pill bg="dark">
            {OrdersList[index]?.orderscount[2]?.meals_remaining}
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
                        {OrdersList[index]?.orderscount[0]?.meals_consumed}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[0]?.meals_ordered}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[0]?.meals_pausedORcancelled}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[0]?.meals_remaining}
                        </Badge>
                      </Col>
                    </Row>
                    <Row>L
                    <Col>
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[1]?.meals_consumed}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[1]?.meals_ordered}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[1]?.meals_pausedORcancelled}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[1]?.meals_remaining}
                        </Badge>
                      </Col>
                    </Row>
                    <Row>D
                    <Col>
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[2]?.meals_consumed}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[2]?.meals_ordered}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[2]?.meals_pausedORcancelled}
                        </Badge>
                      </Col>
                      <Col>
                        {" "}
                        <Badge pill bg="dark">
                        {OrdersList[index]?.orderscount[2]?.meals_remaining}
                        </Badge>
                      </Col>
                    </Row>
                  </small>
                </Col>
              </Row>
              </div>
            </Card>
          );
        })
      ) : (
        <small className="text-muted value-txt px-2">No Orders</small>
      )}
      {/* <Link to="/"> */}
      <button className="w-100 bg-chocolate-900 btn btn-primary" style={{position:'absolute',bottom:'100px',left:'0'}} onClick={() => history.push("/")}>Go To Home</button>
      {/* </Link> */}
    </section>
  );
};

export default Orders;
