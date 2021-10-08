import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../store/actions/products";
import { useParams } from "react-router-dom";
import ProductPlanner from "./product-planner";
import { FormProvider, useFormContext } from "react-hook-form";

const ProductDetails = ({
  control,
  productId,
  isOnboarding = false,
  myRef = null,
}) => {
  let productID = "";
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const [ProductDetails, setProductDetails] = useState({});

  const methods = useFormContext();
  const { setValue } = methods;

  const [FormData, setFormData] = useState({
    cart_id: "",
    item_id: "",
    qty: 0,
    subscription_data: {
      customer_id: userDetails.sub,
      customer_name: "CK",
      is_mealplan: false,
      item_id: "3ac86ce2-3666-4358-bbdf-d1777fce9412",
      item_name: "",
      mealplan: [
        {
          address: {},
          isDelivery: false,
          meal_type: "breakfast",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "lunch",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
        {
          address: {},
          isDelivery: false,
          meal_type: "dinner",
          notes: "",
          order_dates: [],
          price: 0,
          variants: {
            name: "",
            sale_val: 0,
            items: [],
          },
        },
      ],
      qty: 0,
      sale_val: 0,
    },
  });

  useEffect(() => {
    if (id) {
      productID = id;
    } else {
      productID = productId;
    }
    setValue("item_id", productID);
    setValue("qty", 1);

    dispatch(getProductDetails(productID));
  }, [id, productId]);

  useEffect(() => {
    setProductDetails(products.productDetails);
  }, [products.productDetails]);

  const handleChange = (key, value) => {
    console.log("key, value", key, value);
    if (key == "variants") {
      setFormData({ ...FormData, variant: { ...FormData.variant, ...value } });
    } else {
      setFormData({ ...FormData, [key]: value });
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <Row>
          <Col sm={12} lg={6}>
            <p className="h4 mt-3">{ProductDetails.display_name}</p>
            <p className=" h6 text-muted">{ProductDetails.category}</p>

            <div
              style={{
                backgroundImage: `url(${
                  ProductDetails.defaultimg_url ||
                  "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "250px",
              }}
            />
          </Col>
          <Col sm={12} lg={6}>
            <p className="mt-3">{ProductDetails.description}</p>
            <h1>
              <small className="text-muted col-12 h6">
                Including{" "}
                {String(ProductDetails.tax_methods)
                  .replace("Output", "")
                  .replace("-", "")}
              </small>
              <br />
              <BiRupee /> {ProductDetails.sale_val} / {ProductDetails.uom_name}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {products.productDetails.is_mealplan && (
              <ProductPlanner
                productId={""}
                data={products.productDetails}
                FormData={FormData}
                handleChange={handleChange}
                control={control}
              />
            )}
          </Col>
        </Row>
        <div style={{ display: "block", height: 20 }} />
      </div>
    </FormProvider>
  );
};

export default ProductDetails;
