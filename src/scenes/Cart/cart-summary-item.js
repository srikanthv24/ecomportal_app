import React, { useEffect, useState } from "react";
import {
  Card,
  Spinner,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { BsPencil, BsTrash, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCartSummary } from "../../store/actions/cart";
import {deleteCartItem} from "../../store/actions/cart-item";
 
const CartSummaryItem = ({ ProductDetails }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [isExpanded, setisExpanded] = useState(false);

  const [Addresses, setAddresses] = useState({
    B: "Pickup",
    L: "Pickup",
    D: "Pickup",
  });

  const [Duration, setDuration] = useState(null);
  const onDelete = () => {
    dispatch(
        deleteCartItem(
        {
        cart_item_id: Cart?.cartDetails?.items[0].ciid,
        id: Cart?.cartDetails?.items[0]?.id,
        customer_id: userDetails.sub,
      })
    );
  };

  



  useEffect(() => {
    let temp = { ...Addresses };
    ProductDetails.subscription.map((item) => {
      if (item.isDelivery) {
        temp[item?.meal_type] =
          item.address.aline1 +
          ", " +
          item.address.aline2 +
          ", " +
          item.landmark +
          ", "  +
          item.address.city   +
          ", " +
          item.postalcode;
      }
    });
    setAddresses(temp);

    // data.queryCartsByCustomerIndex.items[0].items[1].variants[0].items[0].display_name
    ProductDetails.variants.map((item) => {
      if (item.display_name == "Duration") {
        setDuration(item.items[0].display_name);
      }
    });
  }, [ProductDetails]);

  return (
    <div>
      <Card className="my-1">
        <Card.Body className="p-1 d-flex flex-row align-items-start justify-content-between">
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
          <div style={{ width: "70%" }}>
            <Card.Text className="fs-9 mb-0 pb-0 col-12 text-truncate">
              {ProductDetails.item_name}
            </Card.Text>
            <p className="fs-9 p-0 m-0 col-12 text-truncate text-muted">
              {ProductDetails.category}
            </p>

            <small className="col-12 text-muted">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("Output", "")
                .replace("-", "")}
            </small>
            <p>
              <span
                style={{
                  fontSize: "12px",
                  color: "#212121",
                  wordWrap: "break-word",
                }}
              >
                (Qty: {ProductDetails.qty} X <BiRupee />
                {Number(ProductDetails?.subscription[0]?.sale_val).toFixed(
                  2
                )} / {ProductDetails.uom_name}) + Tax:{" "}
                {ProductDetails.tax_amount} ={" "}
              </span>

              <div
                style={{
                  fontSize: "14px",
                  color: "#000000",
                  fontWeight: "700",
                }}
              >
                <BiRupee />
                {ProductDetails.sub_total}
              </div>
            </p>

            {isExpanded && (
              <div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  Subscribed for {Duration}
                </span>
                {Addresses.B && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Breakfast Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.B}
                    </span>
                  </div>
                )}

                {Addresses.L && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Lunch Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.L}
                    </span>
                  </div>
                )}
                {Addresses.D && (
                  <div className="d-flex flex-column my-2">
                    <span style={{ fontSize: 12 }} className="text-muted">
                      Dinner Address
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>
                      {Addresses.D}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card.Body>
        <Card.Footer
          style={{
            padding: 5,
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItem: "center",
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
          {isExpanded ? (
            <span
              variant="link"
              className="w-100 text-center text-primary"
              onClick={() => setisExpanded(false)}
            >
              <AiFillCaretUp /> view less
            </span>
          ) : (
            <span
              variant="link"
              className="w-100 text-center text-primary"
              onClick={() => setisExpanded(true)}
            >
              <AiFillCaretDown /> view more
            </span>
          )}
          <div
            style={{
              borderRadius: "50%",
              display: "inline-flex",
              // position: "absolute",
              // bottom: 10,
              // right: 10,
            }}
          >
            <Button
              style={{ borderRadius: "50%", marginLeft: 10 }}
              variant="outline-danger"
              size="sm"
              onClick={onDelete}
            > 
              <BsTrashFill />
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CartSummaryItem;
