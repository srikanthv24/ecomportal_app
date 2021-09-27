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
import { Products } from "../../services/api/products";
import { updateCart, updateCartQty } from "../../store/actions/cart";
import { deleteCartItem, updateCardItem } from "../../store/actions/cart-item";

const CardProduct = ({ productId, pushPrice, cartDetails }) => {
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ProductDetails, setProductDetails] = useState({});

  console.log("123XYZ", Cart);

  useEffect(() => {
    // Products.ProductDetails({ payload: productId.item_id }).then((res) => {
    //   console.log('QASDA', res.data.getItem);
    //   setProductDetails(res.data.getItem);
    // });

    // console.log('productId, pushPrice, cartDetails', productId, pushPrice, cartDetails)
    setProductDetails(productId);
    pushPrice((productId.sale_val && productId.sale_val) * productId.qty);
  }, [productId]);

  const onIncrement = () => {
    console.log(ProductDetails);
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16",
        item_id: productId.item_id,
        qty: productId.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    dispatch(
      updateCartQty({
        id: Cart.cartDetails.items[0].id,
        customer_id: "2b534ed8-809a-4fb5-937c-c8f29c994b16",
        item_id: productId.item_id,
        qty: productId.qty - 1,
      })
    );
  };

  return (
    <div>
      <Card
        style={{
          marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Card.Body variant="top" className="p-1">
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
            }}
          />
        </Card.Body>
        <Card.Body className="pt-2">
          <Card.Text className="h6 mb-0 pb-0 col-12 text-truncate">
            {ProductDetails.item_name}
          </Card.Text>
          <small className="col-12 text-truncate text-muted">
            {ProductDetails.category}
          </small>

          <Card.Text>
            <span className="d-flex justify-content-start">
              <span className="d-flex">
                <BiRupee /> {Number(ProductDetails.sale_val).toFixed(2)} /{" "}
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

          <InputGroup size="sm">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => (!Cart.cartItemsLoading ? onDecrement() : null)}
              disabled={Cart.cartItemsLoading}
            >
              {Cart.cartItemsLoading ? (
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
              onClick={() => (!Cart.cartItemsLoading ? onIncrement() : null)}
              disabled={Cart.cartItemsLoading}
            >
              {Cart.cartItemsLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <GrAdd />
              )}
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduct;
