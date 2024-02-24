import React, { useEffect, useState } from "react";
import AppCard from "../card/card";
import AdminProductCard from "../../administrator/components/AdminProductCard/AdminProductCard";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Cards({ statusSelection }) {
  const location = useLocation();

  const Card = location.pathname.includes("admin") ? AdminProductCard : AppCard;

  const allCategories = useSelector((state) => state.allCategories);
  const productsToShow = useSelector((state) => state.productsToShow);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(
      productsToShow
        .filter((product) => product.status === statusSelection)
        .filter((product) =>
          allCategories
            .filter((category) => category.status === true)
            .some((category) => category.id === product.category_id)
        )
    );
  }, [allCategories, productsToShow, statusSelection]);

  return (
    <Row>
      {products.map((item) => (
        <Col xs="12" md="6" lg="4" className="p-3" key={item.id}>
          <Card
            statusSelection={statusSelection}
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
      ))}
    </Row>
  );
}

export default Cards;
