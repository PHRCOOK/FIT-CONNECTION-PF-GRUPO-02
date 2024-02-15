import { Card, Row, Col, CardBody, CardTitle, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/action";
import { useEffect, useState } from "react";

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
}) {
  const dispatch = useDispatch();

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
    // navigate(`/admin/modifyproduct/${id}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    // dispatch(deleteProduct(id));
    // window.alert("Producto borrado correctamente");
    // navigate("/admin");
  };

  return (
    <Card>
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
      <Button
        variant="primary"
        onClick={() => {
          handleModify(id);
        }}
      >
        Modificar
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          handleDelete(id);
        }}
      >
        Borrar
      </Button>
    </Card>
  );
}

export default AdminProductCard;
