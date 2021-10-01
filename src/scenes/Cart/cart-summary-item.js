import React from "react";
import {
  Card,
  Spinner,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { BsPencil, BsTrash, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateCartQty } from "../../store/actions/cart";

const CartSummaryItem = ({ ProductDetails }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(
      updateCartQty({
        id: Cart?.cartDetails?.items[0]?.id,
        customer_id: userDetails.sub,
        item_id: ProductDetails.item_id,
        qty: 0,
      })
    );
  };
  return (
    <Card
      style={{
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Card.Body
        variant="top"
        className="p-1 d-flex flex-column align-items-center justify-content-center"
        style={{ width: "30%" }}
        // onClick={() => history.push("/products/" + ProductDetails.item_id)}
      >
        <div
          style={{
            backgroundImage: `url(${
              ProductDetails.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            margin: 10,
          }}
        />
        {/* 
        {Cart.cartLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <InputGroup size="sm">
            <Button
              size="sm"
              variant="outline-secondary"
              //   onClick={() => (!Cart.cartLoading ? onDecrement() : null)}
              disabled={Cart.cartLoading}
            >
              {Cart.cartLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <GrSubtract />
              )}
            </Button>
            <FormControl
              size="sm"
              aria-label="Example text with two button addons"
              style={{ textAlign: "center" }}
              value={ProductDetails.qty}
              type="number"
              readOnly
            />

            <Button
              variant="outline-secondary"
              size="sm"
              //   onClick={() => (!Cart.cartLoading ? onIncrement() : null)}
              disabled={Cart.cartLoading}
            >
              {Cart.cartLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <GrAdd />
              )}
            </Button>
          </InputGroup>
        )} */}
      </Card.Body>
      <Card.Body className="pt-2" style={{ width: "70%" }}>
        <Card.Text
          className="fs-9 mb-0 pb-0 col-12 text-truncate"
          //   onClick={() => history.push("/products/" + ProductDetails.item_id)}
        >
          {ProductDetails.item_name}
        </Card.Text>
        <p className="fs-9 p-0 m-0 col-12 text-truncate text-muted">
          {ProductDetails.category}
        </p>

        {/* <span className="d-flex justify-content-start">
          <small className="d-flex">
            <BiRupee /> {Number(ProductDetails.sale_val).toFixed(2)} /{" "}
            {ProductDetails.uom_name}
          </small>
        </span> */}
        <small className="col-12 text-muted">
          Including{" "}
          {String(ProductDetails.tax_methods)
            .replace("Output", "")
            .replace("-", "")}
        </small>
        <p>
          <span style={{ fontSize: "12px", color: "#212121" }}>
            (Qty: {ProductDetails.qty} X <BiRupee />
            {Number(ProductDetails.sale_val).toFixed(2)} /{" "}
            {ProductDetails.uom_name}) + Tax: {ProductDetails.tax_amount}
          </span>
          <br /> ={" "}
          <span
            style={{ fontSize: "14px", color: "#000000", fontWeight: "700" }}
          >
            <BiRupee />
            {ProductDetails.sub_total}
          </span>
        </p>
        <div
          style={{
            borderRadius: "50%",
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          <Button
            style={{ borderRadius: "50%", marginLeft: 10 }}
            variant="outline-primary"
            size="sm"
            onClick={() => history.push("/cart")}
          >
            <BsPencil />
          </Button>
          <Button
            style={{ borderRadius: "50%", marginLeft: 10 }}
            variant="outline-danger"
            size="sm"
            onClick={onDelete}
          >
            <BsTrashFill />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartSummaryItem;
