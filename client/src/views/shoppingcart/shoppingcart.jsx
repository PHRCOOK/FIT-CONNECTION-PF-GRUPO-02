import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AppCard from "../../components/card/card";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";

export default function shoppingcart() {
  const [carritos, setCarritos] = useState([]);
  const user = useSelector((state) => state.userShopping);

  const getCarritos = (user) => {
    axios
      .get(`/api/shoppingCart/${user.id}`)
      .then(({ data }) => {
        if (data) {
          setCarritos(data);
        } else {
          setCarritos([]);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          setCarritos([]); // Establece el carrito como vacío cuando se produce un error 500
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al obtener los datos del carrito de compras",
            error,
          });
        }
      });
  };
  useEffect(() => {
    // Realizar la solicitud axios en useEffect para asegurar que se ejecute después del montaje
    if (user) {
      getCarritos(user);
    }

    return setCarritos([]);
  }, [user]); // El segundo argumento [] asegura que useEffect se ejecute solo una vez (en el montaje inicial)

  //* funcion para eliminar el registro de carrito

  const handleClick = async (e) => {
    let id = e.target.value;
    await axios
      .delete(`/api/shoppingCart/${user.id}/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: "Proceso Exitoso",
          text: "El registro de carrito se elimino",
        });
        getCarritos();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error: ${error.message}`,
        });
      });
  };

  const handlePayment = async () => {
    try {
      //const items = JSON.stringify(carritos);
      const payload = {
        user_id: user.id, // Agregar el ID al payload
      };
      const paymentResponse = await axios.post(`/api/createorder/`, payload); // Envía una solicitud POST al backend con los datos del carrito
      // Maneja la respuesta del pago según tus necesidades
      window.location.href = paymentResponse.data.sandbox_init_point;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al procesar el pago: ${error.message}`,
      });
    }
  };

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">Shopping Cart</div>
      <Card>
        <Row>
          <Col className="my-3 mx-3">
            {carritos.length > 0 ? (
              carritos.map((carrito) => (
                <div key={carrito.id}>
                  <AppCard
                    id={carrito.id}
                    name={carrito.name}
                    price={carrito.price}
                    description={carrito.description}
                    status={carrito.status}
                    brand={carrito.brand}
                    image_url={carrito.image_url}
                    stock={carrito.stock}
                    category={carrito.category_id}
                  />
                  <Col>
                    <div className="fw-bold fs-2">
                      Cantidad : {carrito.quantity}
                    </div>
                    {/* <h2>categoria : {carrito.category_id}</h2> */}
                    <Button
                      className="my-3 btn btn-primary"
                      value={carrito.id}
                      onClick={handleClick}
                    >
                      eliminar
                    </Button>
                  </Col>
                </div>
              ))
            ) : (
              <p className="fs-4 mb-3 fw-bold text-center">
                No hay productos en el carrito
              </p>
            )}
            <Button
              className="d-grid gap-2 col-3 mx-auto my-3 btn btn-primary"
              onClick={handlePayment}
            >
              Pagar
            </Button>{" "}
            {/* Botón para iniciar el proceso de pago */}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
