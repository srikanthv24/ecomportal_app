import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";

const ProductsList = ({ list }) => {
  const history = useHistory();

  console.log("listlist", list);

  if (!list.length) {
    return <h3>No products found!!</h3>;
  }
  return (
    <>
      {list.length &&
        list.map((item) => {
          return item ? (
            <Col lg={4} md={4} sm={6} xs={6} key={item.id}>
              <Card
                style={{ marginBottom: 20 }}
                onClick={() => history.push(`/products/${item.id}`)}
              >
                <Card.Img
                  variant="top"
                  src="https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
                />
                <Card.Body style={{ minHeight: 140 }}>
                  <Card.Title>{item.display_name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{item.category}</Card.Text>
                  <Card.Text>
                    <BiRupee /> {item.saleprice}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                  }}
                >
                  <Button size="sm" variant="outline-danger">
                    {false ? <MdFavorite /> : <MdFavoriteBorder />} Wishlist
                  </Button>
                  <Button size="sm">
                    <AiOutlineShoppingCart /> Add to Cart
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ) : null;
        })}
    </>
  );
};

export default ProductsList;
