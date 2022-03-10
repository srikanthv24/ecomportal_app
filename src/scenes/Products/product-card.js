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
import {
  createCart,
  updateCart,
  updateCartQty,
} from "../../store/actions/cart";
import {deleteCartItem} from "../../store/actions/cart-item";
import { showLogin } from "../../store/actions";

const ProductCard = ({ product ,pindex}) => {
  const history = useHistory();
  const Cart = useSelector((state) => state.Cart);
  const dispatch = useDispatch();
  const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
  const [ButtonLoading,setButtonLoading] = useState(false)
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    Cart?.cartDetails &&
      Cart.cartDetails?.items &&
      Cart.cartDetails?.items?.map((item, index) => {
        // eslint-disable-next-line no-unused-expressions
        item.item && item?.item?.item_id == product?.id
          ? setExistingProduct({ ...product, ...item, item: { ...item.item, qty: item.item.qty} })
          : null;
        return null;
      });
  }, [Cart.cartDetails]);

  const handleAddToCart = (pindex) => {
    console.log("pindex",pindex)
    console.log("ProductDetails", product);
    console.log("vvvvv",Cart?.cartDetails)
    //if (Cart?.cartDetails?.items?.length && Cart?.cartDetails?.items[0]?.id) {
    //   dispatch(
    //     updateCart({
    //       customer_id: userDetails.sub,
    //       id: Cart?.cartDetails?.items[0]?.id,
    //      // ciid: product.
    //       item: { item_id: product.id, qty: 1, sale_val: product.sale_val },
    //     })
    //   );
    // } else {

      if (userDetails.sub) {
        let temp = { item_id: product?.id, };
        console.log("temp", temp); 
         dispatch(
           createCart({
             customer_id: userDetails.sub,
             item: { ...temp, qty: 1 },
             accessToken: sessionStorage.getItem("token"),
           })
         );
       setButtonLoading(true)
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
   
      if(ExistingProduct.item.qty == 1){
        dispatch(
          deleteCartItem(
          {
          cart_item_id: ExistingProduct.ciid,
          id: Cart?.cartDetails?.items[0]?.id,
          customer_id: userDetails.sub,
        })
      );
      setExistingProduct({qty: 0})
      }
       else{
      dispatch(
        updateCartQty({
          cart_item_id: ExistingProduct.ciid,
          id: Cart.cartDetails.items[0].id,
          customer_id: userDetails.sub,
          item_id: ExistingProduct.item.item_id,
          qty: ExistingProduct.item.qty - 1,
        })
      );
      };
   
}

  console.log("existingCart",Cart.cartDetails);
  console.log("existingProduct", ExistingProduct);
  console.log("ProductDetails==>", product);


  console.log("vvvv",ExistingProduct?.is_mealplan);
  return (
    <Card className="product-card-item pb-4">
      <Card.Body
        variant="top"
        onClick={() => history.push(`/products/${product?.id}`)}
        className="p-2"
      >
        {/* <div
          style={{
            background: `url(${
              product?.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "120px",
            width: "100%",
            borderRadius:"15px"
          }}
        /> */}
<div className="prd-image-thumbnile">
<img src={product?.defaultimg_url || "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"} alt="img" />
</div>

      </Card.Body>
      <Card.Body
        className="pt-1 text-center px-1"
        // style={{ minHeight: 140 }}
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Card.Text className="mb-0 pb-0 col-12 text-truncate text-center prd-name-txt">
          {product?.display_name}
        </Card.Text>
        <small className="col-12 text-truncate text-center" style={{fontSize:"15px", lineHeight:"25px",fontWeight: "400", color:"#352817", fontFamily: 'Roboto Condensed'}}>
          {product?.category}
        </small>
        {/* <Card.Text className="col-12 text-truncate" style={{fontSize:"15px", lineHeight:"25px",fontWeight: "400", color:"#352817", fontFamily: 'Roboto Condensed'}}>
          {product?.description}
        </Card.Text> */}
        {!product.is_mealplan && <Card.Text>
          <span className="d-flex justify-content-center" style={{fontSize:"15px",lineHeight:"20px",color:"#352817",fontWeight:"400",fontFamily: 'Roboto Condensed'}}>
            <span>
              <BiRupee /> {Number(product?.sale_val).toFixed(2)} / {product?.uom_name}
            </span>
          </span>
          {/* <small className="col-12 text-truncate text-muted">
            Including{" "}
            {String(product?.tax_methods).replace("Output", "").replace("-", "")}
          </small> */}
        </Card.Text>}
      </Card.Body>
        {!product.is_mealplan && <div style={{ marginTop:24 }}> 
          {ExistingProduct?.item?.qty ? (
            <InputGroup className="mb-3">
              <Button onClick={onDecrement} size="sm"  className="cart-increment-btn">
                {Cart.cartLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <GrSubtract />
                )}
              </Button>
              <FormControl
                aria-label="Example text with two button addons"
                style={{ textAlign: "center", background:'transparent', borderColor:"rgba(54,41,24,0.75)" }}
                value={ExistingProduct?.item?.qty || ""}
                type="number"
                size="sm"
                className="mb-0 cart-increment-input"
                // onChange={(ev) => setCartItem(ev.target.value)}
              />

              <Button onClick={onIncrement} size="sm" className="cart-increment-btn">
                {Cart.cartLoading ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <GrAdd />
                )}
              </Button>
            </InputGroup>
          ) : (
            <Button
              size="sm"
              className="cutom-btn add-cart-btn bg-chocolate-800"
              style={{
                display:'flex',fontSize:"15px", fontWeight:"500",fontFamily: 'Roboto Condensed'}}
              onClick={()=>handleAddToCart(pindex)}
            >
              <AiOutlineShoppingCart />{" "}
              {Cart.cartLoading && ButtonLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Add to Cart"
              )}
            </Button>
          )}
        </div>}
    </Card>
  );
};

export default ProductCard;
