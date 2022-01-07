import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQty } from "../../store/actions/cart";
import { useHistory } from "react-router-dom";
import {deleteCartItem} from "../../store/actions/cart-item";

const CardProduct = ({ productId, pushPrice ,pindex,key}) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ProductDetails, setProductDetails] = useState({});
  const [ButtonLoader, setButtonLoader] = useState(false);
  const userDetails = useSelector((state) => state.auth.userDetails);


  console.log("pindex",pindex )

  useEffect(() => {
    // Products.ProductDetails({ payload: productId.item_id }).then((res) => {
    //   console.log('QASDA', res.data.getItem);
    //   setProductDetails(res.data.getItem);
    // });

    // console.log('productId, pushPrice, cartDetails', productId, pushPrice, cartDetails)
    setProductDetails(productId);
    pushPrice((productId.sale_val && productId.sale_val) * productId.qty);
  }, [productId]);

  const onIncrement = (pindex) => {
    console.log(ProductDetails);
    dispatch(
      updateCartQty({
        cart_item_id: Cart.cartDetails.items[pindex].ciid,
        id: Cart.cartDetails.items[pindex].id,
        customer_id: userDetails.sub,
        item_id: productId.item_id,
        qty: productId.qty + 1,
      })
    );
    setButtonLoader(true)
  };

  const onDecrement = (pindex) => {
    if(productId.qty==1){
      dispatch(
        deleteCartItem(
        {
        cart_item_id: Cart?.cartDetails?.items[pindex].ciid,
        id: Cart?.cartDetails?.items[pindex]?.id,
        customer_id: userDetails.sub,
      })
    );

    }
     else{
    dispatch(
      updateCartQty({
        cart_item_id: Cart.cartDetails.items[pindex].ciid,
        id: Cart.cartDetails.items[pindex].id,
        customer_id: userDetails.sub,
        item_id: productId.item_id,
        qty: productId.qty - 1,
      })
    );
    setButtonLoader(true)
     }
  };

  return (
    <div style={{background: "rgb(249, 243, 223)"}}>
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
          className="p-1"
          onClick={() => history.push("/products/" + ProductDetails.item_id)}
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
              height: "120px",
              width: "120px",
              borderRadius:'40px'
            }}
          />
        </Card.Body>
        <Card.Body className="pt-2">
          <Card.Text
            className="h6 mb-0 pb-0 col-12 text-truncate"             
            onClick={() => history.push("/products/" + ProductDetails.item_id)}
          >
            {ProductDetails.item_name}
          </Card.Text>
          <small className="col-12 text-truncate text-muted">
            {ProductDetails.category}
          </small>

          <Card.Text>
            <span className="d-flex justify-content-start">
              <span className="d-flex">
                <BiRupee /> {Number(ProductDetails.sale_val) || 0 } /{" "} 
                {ProductDetails.uom_name}
              </span>
            </span>
            <small className="col-12 text-muted">
              Including{" "}
              {String(ProductDetails.tax_methods)
                .replace("Output", "")
                .replace("-", "")}
            </small>
          </Card.Text>

          {Cart.cartLoading && ButtonLoader? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <InputGroup size="sm">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => (!Cart.cartLoading ? onDecrement(pindex) : null)}
                disabled={Cart.cartLoading}
              >
                {Cart.cartLoading && ButtonLoader ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <GrSubtract />
                )}
              </Button>
              <FormControl
                size="sm"
                aria-label="Example text with two button addons"
                style={{ textAlign: "center" }}
                value={productId.qty}
                type="number"
                readOnly
              />

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => (!Cart.cartLoading ? onIncrement(pindex) : null)}
                disabled={Cart.cartLoading}
              >
                {Cart.cartLoading && ButtonLoader ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <GrAdd />
                )}
              </Button>
            </InputGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduct;
