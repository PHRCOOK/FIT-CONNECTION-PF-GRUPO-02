/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { deleteProduct } from "../../../redux/action";

function Product(props) {
  const { id, name, price, description, status, code, image_url, stock } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModify = () => {
    navigate(`/admin/modifyproduct/${id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire({
          icon: "success",
          title: "Proceso Exitoso",
          text: "Producto borrado correctamente",
        });
        navigate("/admin");
      }
    });
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
            <Col xs="12" md="6">
              <span className="fw-bold">Stock:</span> {stock}
            </Col>
            <Col xs="12" md="6">
              <span className="fw-bold">Status:</span> {status.toString()}
            </Col>
            <Col xs="12">{description}</Col>
          </Row>
        </CardBody>
      </Card>

      <Button className="mx-3 my-2" variant="primary" onClick={handleModify}>
        Modificar
      </Button>
      <Button className="mx-3 my-2" variant="danger" onClick={handleDelete}>
        Eliminar
      </Button>
    </div>
  );
}

export default Product;
