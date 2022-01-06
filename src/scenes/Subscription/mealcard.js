import React from "react";
import { Button, Card } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { saveMealPlanId } from "../../store/actions/mealPlans";

const MealCard = ({ product, handleNextStep }) => {
  const dispatch = useDispatch();
  return (
    <Card
      style={{ marginBottom: 10}}
      onClick={() => {
        //handleClick(product.id);
        handleNextStep();
        dispatch(saveMealPlanId(product.id));
        }}
    >
      <Card.Body variant="top" 
     >
        <div
          style={{
            backgroundImage: `url(${
              product.defaultimg_url ||
               "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "120px",
            width: "100%",
          }}
        />
      </Card.Body>
      <Card.Body style={{ minHeight: 140 }}>
        <Card.Text className="h6 mb-0 pb-0 col-12 text-truncate">
          {product.display_name}
        </Card.Text>
        <small className="col-12 text-truncate text-muted">
          {product.category}
        </small>
        <Card.Text className="col-12 text-truncate">
          {product.description}
        </Card.Text>
        <Card.Text>
          <BiRupee /> {product.sale_val} / {product.uom_name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MealCard;