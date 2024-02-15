import React, { useEffect } from "react";
import AppCard from "../card/card";
import AdminProductCard from "../../administrator/components/AdminProductCard/AdminProductCard";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function Cards() {
  const location = useLocation();

  const Card = location.pathname.includes("admin") ? AdminProductCard : AppCard;

  let productsToShow = useSelector((state) => state.productsToShow);
  if (!location.pathname.includes("admin")) {
    productsToShow = productsToShow.filter((item) => item.status);
  }

  return (
    <Row>
      {productsToShow.map((item) => {
        return (
          <Col xs="12" md="6" lg="4" className="p-3" key={item.id}>
            <Card
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              status={item.status}
              brand={item.brand}
              image_url={item.image_url}
              stock={item.stock}
              category_id={item.category_id}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default Cards;
