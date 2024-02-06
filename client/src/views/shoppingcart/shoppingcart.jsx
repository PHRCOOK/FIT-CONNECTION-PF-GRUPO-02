import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card/card";

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

  return (
    <div>
      <h1>Shopping Cart</h1>
      {carritos.length > 0 ? (
        carritos.map((carrito) => (
          <div key={carrito.id}>
            <button value={carrito.id} onClick={handleClick}>
              eliminar
            </button>
            <Card
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
            <h2>Cantidad : {carrito.quantity}</h2>
            {/* <h2>categoria : {carrito.category_id}</h2> */}
          </div>
        ))
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </div>
  );
}
