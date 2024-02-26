import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const Detail = ({ sub }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userShopping);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    axios
      .get(`api/categories`)
      .then((response) => {
        if (response.data.Items && Array.isArray(response.data.Items)) {
          setCategories(response.data.Items);
        } else {
          console.error(
            "La respuesta no contiene un array en la propiedad Items"
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const {
    name,
    price,
    description,
    status,
    brand,
    image_url,
    stock,
    category_id,
  } = product;

  const category = categories.find((category) => category.id === category_id);

  const handleClick = async (e) => {
    try {
      await axios.post("/api/shoppingCart", {
        user_id: user.id,
        product_id: id,
        quantity: 1,
      });

      Swal.fire({
        icon: "success",
        title: "Agregado correctamente al carrito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar al carrito",
        text: error.message || "Hubo un problema",
      });
    }
  };

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">Detalle de Productos</div>
      <Card className="border shadow">
        <Row>
          <Col>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Card.Img
                className="my-3"
                style={{ height: "300px", objectFit: "contain" }}
                variant="top"
                src={image_url}
              />
            )}
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <div className="mb-3">
                <Row>
                  <Col xs="12" md="6">
                    <strong>Marca:</strong>
                    <span className="ms-2">{brand}</span>
                  </Col>
                  <Col xs="12" md="6">
                    <strong>Categoria:</strong>
                    <span className="ms-2">
                      {category ? category.name : category}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="12" md="6">
                    <strong>Precio:</strong>
                    <span className="ms-2">${price}</span>
                  </Col>
                  <Col xs="12" md="6">
                    <strong>Estado:</strong>
                    <span className="ms-2">
                      {status ? "Activo" : "Inactivo"}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="12" md="6">
                    <strong>Cantidad:</strong>
                    <span className="ms-2">{stock}</span>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs="7">
                    <strong>Descripcion:</strong>
                    <span className="ms-2">{description}</span>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <div className="text-center mt-4">
        {isAuthenticated ? (
          <Button className="btn btn-primary" onClick={handleClick}>
            Agregar al carrito
          </Button>
        ) : (
          <Button
            className="btn btn-primary"
            onClick={() => loginWithRedirect()}
          >
            Iniciar Sesion
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Detail;
