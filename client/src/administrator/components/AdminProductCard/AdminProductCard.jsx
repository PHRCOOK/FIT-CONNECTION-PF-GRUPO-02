import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  Button,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, deleteProduct } from "../../../redux/action";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminProductCard({
  id,
  name,
  price,
  description,
  status,
  brand,
  image_url,
  stock,
  category_id,
  statusSelection,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCategories = useSelector((state) => state.allCategories);

  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const foundCategory = allCategories.find((cat) => cat.id === category_id);
    setCategoryName(foundCategory ? foundCategory.name : "");
  }, [allCategories, category_id]);

  const [loading, setLoading] = useState(false);

  const handleModify = (id) => {
    navigate(`/admin/product/modify/${id}`);
  };

  const handleDelete = async (id, status) => {
    const newStatus = !status;
    try {
      setLoading(true);
      await dispatch(deleteProduct(id, { status: newStatus }));
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: statusSelection
          ? "Producto desactivado correctamente"
          : "Producto activado correctamente",
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al borrar producto",
      });
      setLoading(false);
    }
  };

  return (
    <Card className="p-3 h-100">
      <Card.Img
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      />
      <CardBody>
        <CardTitle>Id: {id}</CardTitle>
        <CardTitle>Nombre: {name}</CardTitle>
        <Row>
          <Col xs="12" md="10">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="10">
            <span className="fw-bold">Marca:</span> {brand}
          </Col>
          <Col xs="12" md="10">
            <span className="fw-bold">Estado:</span> {String(status)}
          </Col>
          <Col xs="12" md="10">
            <span className="fw-bold">Stock:</span> {stock}
          </Col>
          <Col xs="12" md="10">
            <span className="fw-bold">Categoría:</span> {categoryName}
          </Col>
          <Col xs="12" className="mt-3">
            {description}
          </Col>
        </Row>
      </CardBody>
      <Button
        className="mx-3 my-2"
        variant="primary"
        onClick={() => {
          handleModify(id);
        }}
      >
        Modificar
      </Button>
      <Button
        className="mx-3 my-2"
        variant={statusSelection ? "danger" : "success"}
        onClick={() => {
          handleDelete(id, status);
        }}
        disabled={loading}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : statusSelection ? (
          "Desactivar"
        ) : (
          "Activar"
        )}
      </Button>
    </Card>
  );
}

export default AdminProductCard;
