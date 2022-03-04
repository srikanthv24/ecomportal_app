/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { BiRupee } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export const MealCard = ({ product, handleClick, handleNextStep }) => {
  const history = useHistory();
  const methods = useFormContext();
  const { setValue } = methods;


  return (
    <Card
      style={{
        marginBottom: 30,
        borderColor: "transparent",
        padding: "0px",
        background: "transparent",
      }}
     
    >
      <Card.Body
        variant="top"
        className="p-2"
        onClick={() => {
          handleNextStep() 
          setValue("item_id", product?.id);
		      setValue("qty", 1);
        }}
      >
        <div
          style={{
            backgroundImage: `url(${
              product?.defaultimg_url ||
              "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "120px",
            width: "100%",
            borderRadius: "15px",
          }}
        />
      </Card.Body>
      <Card.Body
        className="pt-1 text-center px-1"
        style={{ minHeight: 40 }}
      >
        <Card.Text
          className="h6 mb-0 pb-0 col-12 text-truncate text-center"
          style={{
            fontSize: "15px",
            lineHeight: "25px",
            fontWeight: "700",
            color: "#352817",
            fontFamily: "Roboto Condensed",
          }}
        >
          {product?.display_name}
        </Card.Text>
        <small
          className="col-12 text-truncate"
          style={{
            fontSize: "15px",
            lineHeight: "25px",
            fontWeight: "400",
            color: "#352817",
            fontFamily: "Roboto Condensed",
          }}
        >
          {product?.category}
        </small>
        <Card.Text>
          {/* <span
            className="d-flex justify-content-center"
            style={{
              fontSize: "15px",
              lineHeight: "20px",
              color: "#352817",
              fontWeight: "400",
              fontFamily: "Roboto Condensed",
            }}
          >
            <span>
              <BiRupee /> {Number(product?.sale_val).toFixed(2)} /{" "}
              {product?.uom_name}
            </span>
          </span> */}
          {/* <small className="col-12 text-truncate text-muted">
            Including{" "}
            {String(product?.tax_methods)
              .replace("Output", "")
              .replace("-", "")}
          </small> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
