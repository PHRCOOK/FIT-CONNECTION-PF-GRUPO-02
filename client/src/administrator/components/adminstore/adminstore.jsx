/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Product from "../products/products";

function AdminStore() {
  const allProducts = useSelector((state) => state.allProducts);

  if (!Array.isArray(allProducts)) {
    return <p>Cargandos...</p>;
  }
  return (
    <Row>
      {allProducts.map((product) => (
        <Col xs="12" md="6" lg="4" className="p-3" key={product.id}>
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            status={product.status}
            code={product.code}
            image_url={product.image_url}
            stock={product.stock}
            category={product.category}
          />
        </Col>
      ))}
    </Row>
  );
}

export default AdminStore;
