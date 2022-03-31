/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCart, updateCartQty, getCart } from "../../store/actions/cart";
import { deleteCartItem } from "../../store/actions/cart-item";
import { showLogin } from "../../store/actions";

const ProductCard = ({ product, pindex }) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const [ButtonLoading, setButtonLoading] = useState(false);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    Cart?.cartDetails &&
      Cart.cartDetails?.items &&
      Cart.cartDetails?.items?.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item.item && item?.item?.item_id == product?.id
          ? setExistingProduct({
              ...product,
              ...item,
              item: { ...item.item, qty: item.item.qty },
            })
          : null;
        return null;
      });
  }, [Cart.cartDetails]);

  useEffect(() => {
    Cart?.cartDetails &&
      Cart.cartDetails?.items &&
      Cart.cartDetails?.items?.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item.item && item?.item?.item_id === product?.id
          ? 
            dispatch(getCart({ customer_id: userDetails.sub }))
          : null;
        return null;
      });
  }, [Cart.cartCreated]);

  const handleAddToCart = (pindex) => {
    if (userDetails.sub) {
      let temp = { item_id: product?.id };
      dispatch(
        createCart({
          customer_id: userDetails.sub,
          item: { ...temp, qty: 1 },
          accessToken: localStorage.getItem("token"),
        })
      );
      // setButtonLoading(true);
    } else {
      dispatch(showLogin());
    }
  };

  const onIncrement = () => {
    dispatch(
      updateCartQty({
        cart_item_id: ExistingProduct.ciid,
        id: Cart.cartDetails.items[0].id,
        customer_id: userDetails.sub,
        item_id: ExistingProduct.item.item_id,
        qty: ExistingProduct.item.qty + 1,
      })
    );
  };

  const onDecrement = () => {
    if (ExistingProduct.item.qty == 1) {
      dispatch(
        deleteCartItem({
          cart_item_id: ExistingProduct.ciid,
          id: Cart?.cartDetails?.items[0]?.id,
          customer_id: userDetails.sub,
        })
      );
      setExistingProduct({ qty: 0 });
    } else {
      dispatch(
        updateCartQty({
          cart_item_id: ExistingProduct.ciid,
          id: Cart.cartDetails.items[0].id,
          customer_id: userDetails.sub,
          item_id: ExistingProduct.item.item_id,
          qty: ExistingProduct.item.qty - 1,
        })
      );
    }
  };

  return (
    <Card className="product-card-item pb-4">
      <Card.Body
        variant="top"
        onClick={() => history.push(`/products/${product?.id}`)}
        className="p-2"
      >
        <div className="prd-image">
          <img
            src={
              product?.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            }
            alt="img"
          />
        </div>
      </Card.Body>
      <Card.Body
        className="pt-1 text-center px-1"
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Card.Text className="mb-0 pb-0 col-12 text-center prd-title">
          {product?.display_name}
        </Card.Text>
        {/* <small
          className="col-12 text-truncate text-center prd-category"
        >
          {product?.category}
        </small> */}
        {!product?.is_mealplan && (
          <Card.Text className="mt-2 d-flex justify-content-center ">
            <span className="prd-value">
              <span>
                <BiRupee /> {Number(product?.sale_val).toFixed(2)} 
                    {/*/{" "} {product?.uom_name} */}
              </span>
            </span>
          </Card.Text>
        )}
      </Card.Body>
      {!product?.is_mealplan && (
        <div className="text-center mt-2">
          {ExistingProduct?.item?.qty ? (
            <InputGroup className="mb-3">
              <Button
                onClick={onDecrement}
                size="sm"
                className="cart-increment-btn"
              >
                {Cart.cartLoading || Cart.cartUpdateLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <GrSubtract />
                )}
              </Button>
              <FormControl
                aria-label="Example text with two button addons"
                style={{
                  textAlign: "center",
                  background: "transparent",
                  borderColor: "rgba(54,41,24,0.75)",
                }}
                value={ExistingProduct?.item?.qty || ""}
                // type="number"
                disabled={true}
                size="sm"
                className="mb-0 cart-increment-input"
              />

              <Button
                onClick={onIncrement}
                size="sm"
                className="cart-increment-btn"
              >
                {Cart.cartLoading || Cart.cartUpdateLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <GrAdd />
                )}
              </Button>
            </InputGroup>
          ) : (
            <Button
              size="sm"
              className="prd-btn d-flex align-items-center justify-content-around"              
              onClick={() => handleAddToCart(pindex)}
            >
              <AiOutlineShoppingCart />{" "}
              {Cart.cartLoading || Cart.cartUpdateLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
