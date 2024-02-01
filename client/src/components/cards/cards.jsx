import React from "react";
import AppCard from "../card/card";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Cards() {
  let productsToShow = useSelector((state) => state.productsToShow);
  productsToShow = productsToShow.filter((item) => item.status);

  return (
    <Row>
      {productsToShow.map((item) => {
        return (
          <Col xs="12" md="6" lg="4" className="p-3" key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <AppCard
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                status={item.status}
                code={item.code}
                image_url={item.image_url}
                stock={item.stock}
                category={item.category}
              />
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

export default Cards;