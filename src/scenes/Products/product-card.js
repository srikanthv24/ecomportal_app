import React from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ProductCard = ({ product }) => {
  const history = useHistory();
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Body
        variant="top"
        onClick={() => history.push(`/products/${product.id}`)}
        className="p-1"
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
      <Card.Body
      className="pt-2"
        style={{ minHeight: 140 }}
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Card.Text className="h6 mb-0 pb-0 col-12 text-truncate">
          {product.display_name}
        </Card.Text>
        <small className="col-12 text-truncate text-muted">
          {product.category}
        </small>
        <Card.Text className="col-12 text-truncate">
          {product.description +
            "kdjshfjdsjhfkdskfjksdjfdsjfklsdjflksdjfkjdsklfjldsjflj  "}
        </Card.Text>
        <Card.Text>
          <span className="d-flex">

          <BiRupee /> {product.saleprice} / {product.uom_name}
          </span>
        <small className="col-12 text-truncate text-muted">
          Including {String(product.tax_methods).replace('Output', '').replace('-', '')}
        </small>
        </Card.Text>
      </Card.Body>
      <Card.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
        <Button size="sm" style={{ width: "100%" }}>
          <AiOutlineShoppingCart /> Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
