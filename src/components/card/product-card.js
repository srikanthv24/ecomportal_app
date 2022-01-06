import React from "react";
import { Button, Card } from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import "./styles.css";
const ProductCard = ({
  imgUrl,
  Title,
  content,
  price,
  name,
  category,
  status,
}) => {
  return (
    
    <Card style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={
          imgUrl ||
          "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
        }
      />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{`${content}, ${name}, ${category}`}</Card.Text>
        <Button variant="primary">
          <BiRupee /> {price}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
