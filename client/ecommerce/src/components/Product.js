import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-dark">
          <Card.Title as="h3">{product.name}</Card.Title>
        </Link>

        <Card.Text as="h6">
          Kes {product.price}
        </Card.Text>
        <Card.Text as="h6">
          {product.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
