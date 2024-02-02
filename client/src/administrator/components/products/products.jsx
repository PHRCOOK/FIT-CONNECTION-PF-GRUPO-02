/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Card, Row, Col, CardBody, CardTitle } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProduct, putProduct } from "../../../redux/action";

function product(props) {
  const {
    id,
    name,
    price,
    description,
    status,
    code,
    image_url,
    stock,
    category,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModify = (id) => {
    navigate(`/admin/modifyproduct/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.alert("Producto borrado correctamente");
    navigate("/admin");
  };

  return (
    <div>
      <Card>
        <Card.Img
          style={{ height: "300px", objectFit: "contain" }}
          variant="top"
          src={image_url}
        />
        <CardBody>
          <CardTitle>Nombre: {name}</CardTitle>
          <CardTitle>Id: {id}</CardTitle>
          <Row>
            <Col xs="12" md="6">
              <span className="fw-bold">Precio:</span> ${price}
            </Col>
            <Col xs="12" md="6">
              <span className="fw-bold">Codigo:</span> {code}
            </Col>
            <Col xs="12">{description}</Col>
          </Row>
        </CardBody>
      </Card>

      <button
        onClick={() => {
          handleModify(props.id);
        }}
      >
        MODIFICAR
      </button>
      <button
        onClick={() => {
          handleDelete(props.id);
        }}
      >
        ELIMINAR
      </button>
    </div>
  );
}

export default product;
