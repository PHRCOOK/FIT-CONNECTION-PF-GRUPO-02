import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const Detail = ({ sub }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.userShopping);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    axios
      .get(`api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error(error);
        console.error(error.response);
      });

    axios
      .get(`api/categories`)
      .then((response) => {
        console.log(response.data);
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
        console.error(error.response);
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
      <Card>
        <Row>
          <Col>
            <Card.Img
              className="my-3"
              style={{ height: "300px", objectFit: "contain" }}
              variant="top"
              src={image_url}
            />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Row>
                <Col xs="12" md="6">
                  <span className="fw-bold">Marca:</span> {brand}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Categoria:</span>{" "}
                  {category ? category.name : category}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Precio:</span> ${price}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Estado:</span>{" "}
                  {status ? "Activo" : "Inactivo"}
                </Col>
                <Col xs="12" md="6">
                  <span className="fw-bold">Cantidad:</span> {stock}
                </Col>
                <Col xs="12">
                  <span className="fw-bold">Descripcion: </span>
                  {description}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
        {isAuthenticated ? (
          <Button
            className="btn btn-primary d-grid gap-2 col-3 mx-auto my-3"
            onClick={handleClick}
          >
            Agregar al carrito
          </Button>
        ) : (
          <Button
            className="btn btn-primary d-grid gap-2 col-3 mx-auto my-3"
            onClick={() => loginWithRedirect()}
          >
            Iniciar Sesion
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default Detail;
