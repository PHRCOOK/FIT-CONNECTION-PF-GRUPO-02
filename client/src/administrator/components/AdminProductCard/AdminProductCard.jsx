import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProduct } from "../../../redux/action";

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
  }, []);

  useEffect(() => {
    setCategoryName(allCategories.find((cat) => cat.id === category_id).name);
  }, [allCategories]);

  const handleModify = (id) => {
    console.log(id);
    navigate(`/admin/product/modify/${id}`);
  };

  const handleDelete = (id, status) => {
    console.log(id);
    console.log(status);
    const newStatus = !status;
    try {
      dispatch(deleteProduct(id, { status: newStatus }));

      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: statusSelection
          ? "Producto desactivado correctamente"
          : "Producto activado correctamente",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al borrar producto",
      });
    }
    // dispatch(deleteProduct(id));
    // window.alert("Producto borrado correctamente");
    // navigate("/admin");
  };

  return (
    <Card className="p-3">
      <Card.Img
        style={{ height: "300px", objectFit: "contain" }}
        variant="top"
        src={image_url}
      />
      <CardBody>
        <CardTitle>Id: {id}</CardTitle>
        <CardTitle>Nombre: {name}</CardTitle>
        <Row>
          <Col xs="12" md="6">
            <span className="fw-bold">Precio:</span> ${price}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Brand:</span> {brand}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Estatus:</span> {String(status)}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Stock:</span> {stock}
          </Col>
          <Col xs="12" md="6">
            <span className="fw-bold">Categoría:</span> {categoryName}
          </Col>
          <Col xs="12">{description}</Col>
        </Row>
      </CardBody>
      {/* <Button
        className="mx-3 my-2"
        variant="primary"
        onClick={() => {
          handleModify(id);
        }}
      >
        Modificar
      </Button> */}
      <Button
        className="mx-3 my-2"
        variant="secondary"
        onClick={() => {
          handleDelete(id, status);
        }}
      >
        {statusSelection ? "Desactivar" : "Activar"}
      </Button>
    </Card>
  );
}

export default AdminProductCard;
