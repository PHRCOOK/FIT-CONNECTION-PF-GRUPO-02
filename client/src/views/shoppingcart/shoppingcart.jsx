import React, { useState, useEffect } from "react";
import axios from "axios";
import AppCard from "../../components/card/card";
import { Button, Row, Col, Card, Container } from "react-bootstrap";

export default function shoppingcart() {
  const [carritos, setCarritos] = useState([]);

  const getCarritos = () => {
    axios
      .get("/api/shoppingCart/6")
      .then(({ data }) => {
        setCarritos(data);
      })
      .catch((error) => {
        window.alert("Error al obtener datos del carrito de compras:", error);
      });
  };
  useEffect(() => {
    // Realizar la solicitud axios en useEffect para asegurar que se ejecute después del montaje
    getCarritos();

    return setCarritos([]);
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez (en el montaje inicial)

  //* funcion para eliminar el registro de carrito

  const handleClick = async (e) => {
    let id = e.target.value;
    await axios
      .delete(`/api/shoppingCart/6/${id}`)
      .then(({ data }) => {
        window.alert("El registro de carrito se elimino");
        getCarritos();
      })
      .catch((error) => {
        window.alert(`Error: ${error.message}`);
      });
  };

  const handlePayment = async () => {
    try {
      const items = JSON.stringify(carritos)
      const paymentResponse = await axios.post('/api/createorder', items); // Envía una solicitud POST al backend con los datos del carrito
      // Maneja la respuesta del pago según tus necesidades
      window.location.href = paymentResponse.data.init_point
    } catch (error) {
      window.alert(`Error al procesar el pago: ${error.message}`);
    }
  };

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">Shopping Cart</div>
      <Card >
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
                    code={carrito.code}
                    image_url={carrito.image_url}
                    stock={carrito.stock}
                    category={carrito.category_id}
                  />
                  <Col>
                    <div className="fw-bold fs-2">Cantidad : {carrito.quantity}</div>
                    {/* <h2>categoria : {carrito.category_id}</h2> */}
                    <Button className="my-3 btn btn-primary" value={carrito.id} onClick={handleClick}>
                      eliminar
                    </Button>
                  </Col>
                </div>
              ))
            ) : (
              <p>No hay productos en el carrito</p>
            )}
            <Button className="d-grid gap-2 col-3 mx-auto my-3 btn btn-primary" onClick={handlePayment}>Pagar</Button> {/* Botón para iniciar el proceso de pago */}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
