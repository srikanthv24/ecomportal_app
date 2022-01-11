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
import { deleteCartItem } from "../../store/actions/cart-item";

const CartSummaryItem = ({ ProductDetails, pindex }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();
  const [isExpanded, setisExpanded] = useState(false);

  const [Addresses, setAddresses] = useState({
    B: "",
    L: "",
    D: "",
  });

  const [mealType, setMealType] = useState("");
  const [Duration, setDuration] = useState(null);
  const onDelete = (pindex) => {
    dispatch(
      deleteCartItem({
        cart_item_id: Cart?.cartDetails?.items[pindex].ciid,
        id: Cart?.cartDetails?.items[pindex]?.id,
        customer_id: userDetails.sub,
      })
    );
  };

  console.log("oooooo", ProductDetails);
  useEffect(() => {
    let temp = { ...Addresses };
    ProductDetails?.subscription?.map((item, index) => {
      if (item.isDelivery) {
        temp[item?.meal_type] =
          item.address.aline1 +
          ", " +
          item.address.aline2 +
          ", " +
          item.address.landmark +
          ", " +
          item.address.city +
          ", " +
          item.postalcode;
      } else {
        temp[item?.meal_type] = "Pickup";
      }

      if (item.meal_type) {
        setMealType(item.meal_type);
      }
    });
    setAddresses(temp);

    // data.queryCartsByCustomerIndex.items[0].items[1].variants[0].items[0].display_name
    // ProductDetails.variants.map((item) => {
    //   if (item.display_name == "Duration") {
    //     setDuration(item.items[0].display_name);
    //   }
    // });
  }, [ProductDetails]);

  return (
    <div>
      <Card className="my-1 bg-1">
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
          <div style={{ width: "calc(100% - 120px)" }}>
            <Card.Text className="fs-9 mb-0 pb-0 col-12 text-truncate ff-4 fw-700 clr-black">
              {ProductDetails.item_name}
            </Card.Text>
            <p className="fs-9 p-0 m-0 col-12 text-truncate ff-4 fw-400 clr-secondary">
              {ProductDetails.category}
            </p>

            <small className="col-12 ff-4 clr-black">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("Output", "")
                .replace("-", "")}
            </small>
            <p className="ff-2 clr-black mb-2">
              {/* {ProductDetails.category === "Snacks" ? (
                <span
                  style={{
                    fontSize: "12px",
                    wordWrap: "break-word",
                  }}
                >
                  (Qty: {ProductDetails?.qty} X <BiRupee />
                  {Number(ProductDetails?.sub_total).toFixed(2)} /{" "}
                  {ProductDetails.uom_name}) + Tax: {ProductDetails.tax_amount}{" "}
                  ={" "}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "12px",
                    wordWrap: "break-word",
                  }}
                >
                  (Qty: {ProductDetails?.qty} X <BiRupee />
                  {Number(ProductDetails?.subscription[0]?.sale_val).toFixed(
                    2
                  )}{" "}
                  /
                </span>
              )} */}
              <span>
              {ProductDetails?.uom_name} + Tax:{" "}
                  {ProductDetails?.tax_amount} ={" "}
                  
              </span>
              <div
                className="ff-2 clr-black mb-2 fw-700"
                style={{
                  fontSize: "14px",
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
            background: "rgba(245, 224, 188, 1) !important",
          }}
        >
          <Button
            style={{
              borderRadius: "50%",
              marginLeft: 10,
              color: "#424141",
              borderColor: "#424141",
              display: "flex",
              alignItems: "center",
              width: "30px",
              height: "30px",
            }}
            variant="outline-danger"
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
              className="w-100 text-center clr-black"
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
              style={{
                borderRadius: "50%",
                marginLeft: 10,
                color: "#F05922",
                borderColor: "#F05922",
                display: "flex",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(pindex)}
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
