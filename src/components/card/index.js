import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = ({title, content, imgUrl}) => {
  return (
    <Card className="bg-dark text-white w-50 border-0">
      <Card.Img src={imgUrl} alt="Card image" />
      <Card.ImgOverlay style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default CardComponent;