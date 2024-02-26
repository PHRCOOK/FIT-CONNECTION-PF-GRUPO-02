
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import AppCard from "../../components/card/card";
// import { Button, Row, Col, Card, Container } from "react-bootstrap";
// import Swal from "sweetalert2";

// export default function ShoppingCart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0); // Estado para almacenar el total del precio
//   const user = useSelector((state) => state.userShopping);

//   const getCartItems = (user) => {
//     if (user) {
//       axios
//         .get(`/api/shoppingCart/${user.id}`)
//         .then(({ data }) => {
//           if (data) {
//             setCartItems(data);
//             calculateTotalPrice(data); // Calcular el total cuando se actualizan los elementos del carrito
//           } else {
//             setCartItems([]);
//             setTotalPrice(0); // Reiniciar el total si el carrito está vacío
//           }
//         })
//         .catch((error) => {
//           if (error.response && error.response.status === 500) {
//             setCartItems([]);
//             setTotalPrice(0); // Reiniciar el total en caso de error
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: "Error al obtener los datos del carrito de compras",
//               error,
//             });
//           }
//         });
//     }
//   };
//   // funcion para calcular el total del carrito
//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   useEffect(() => {
//     if (user) {
//       getCartItems(user);
//     }

//     return setCartItems([]);
//   }, [user]);

//   const handleClick = async (e) => {
//     let id = e.target.value;
//     await axios
//       .delete(`/api/shoppingCart/${user.id}/${id}`)
//       .then(({ data }) => {
//         Swal.fire({
//           icon: "success",
//           title: "Proceso Exitoso",
//           text: "El registro de carrito se eliminó",
//         });
//         getCartItems(user);
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: `Error: ${error.message}`,
//         });
//       });
//   };

//   const handlePayment = async () => {
//     try {
//       const payload = {
//         userId: user.id,
//       };
//       const paymentResponse = await axios.post(`/api/createorder/`, payload);
//       window.location.href = paymentResponse.data.sandbox_init_point;
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "El carrito de compras está vacío",
//       });
//     }
//   };

//   return (
//     <Container>
//       <div className="fs-4 mb-3 fw-bold text-center">Carrito de compras</div>
//       <Card>
//         <Row>
//           <Col className="my-3 mx-3">
//             {cartItems.length > 0 ? (
//               cartItems.map((cartItem) => (
//                 <div key={cartItem.id}>
//                   <AppCard
//                     id={cartItem.id}
//                     name={cartItem.name}
//                     price={cartItem.price}
//                     description={cartItem.description}
//                     status={cartItem.status}
//                     brand={cartItem.brand}
//                     image_url={cartItem.image_url}
//                     stock={cartItem.stock}
//                     category={cartItem.category_id}
//                   />
//                   <Col>
//                     <div className="fw-bold fs-2">
//                       Cantidad : {cartItem.quantity}
//                     </div>
//                     <Button
//                       className="my-3 btn btn-danger"
//                       value={cartItem.id}
//                       onClick={handleClick}
//                     >
//                       Eliminar
//                     </Button>
//                   </Col>
//                 </div>
//               ))
//             ) : (
//               <p className="fs-4 mb-3 fw-bold text-center">
//                 No hay productos en el carrito
//               </p>
//             )}
//             {cartItems.length > 0 && ( // Mostrar el total solo si hay elementos en el carrito
//               <div className="fw-bold fs-4 mb-3 text-center">
//                 Total: ${totalPrice.toFixed(2)} {/* Mostrar el total con formato de dos decimales */}
//               </div>
//             )}
//             <Button
//               className="d-grid gap-2 col-3 mx-auto my-3 btn btn-primary"
//               onClick={handlePayment}
//             >
//               Pagar
//             </Button>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AppCard from "../../components/card/card";
import { Button, Row, Col, Card, Container, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Estado para indicar si se están cargando los datos
  const user = useSelector((state) => state.userShopping);

  useEffect(() => {
    if (user) {
      getCartItems(user);
    }
  }, [user]);

  const getCartItems = async (user) => {
    setLoading(true); // Mostrar indicador de carga al iniciar la solicitud
    try {
      const response = await axios.get(`/api/shoppingCart/${user.id}`);
      if (response.data) {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setCartItems([]);
        setTotalPrice(0);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener los datos del carrito de compras",
          error,
        });
      }
    } finally {
      setLoading(false); // Ocultar indicador de carga al finalizar la solicitud
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleClick = async (e) => {
    let id = e.target.value;
    await axios
      .delete(`/api/shoppingCart/${user.id}/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: "Proceso Exitoso",
          text: "El registro de carrito se eliminó",
        });
        getCartItems(user);
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
      const payload = {
        userId: user.id,
      };
      const paymentResponse = await axios.post(`/api/createorder/`, payload);
      window.location.href = paymentResponse.data.sandbox_init_point;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El carrito de compras está vacío",
      });
    }
  };

  return (
    <Container>
      <div className="fs-4 mb-3 fw-bold text-center">Carrito de compras</div>
      <Card>
        <Row>
          <Col className="my-3 mx-3">
            {loading ? ( // Mostrar el indicador de carga si loading es true
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando productos...</p>
              </div>
            ) : (
              <>
                {cartItems.length > 0 ? (
                  cartItems.map((cartItem) => (
                    <div key={cartItem.id}>
                      <AppCard
                        id={cartItem.id}
                        name={cartItem.name}
                        price={cartItem.price}
                        description={cartItem.description}
                        status={cartItem.status}
                        brand={cartItem.brand}
                        image_url={cartItem.image_url}
                        stock={cartItem.stock}
                        category={cartItem.category_id}
                      />
                      <Col>
                        <div className="fw-bold fs-2">
                          Cantidad : {cartItem.quantity}
                        </div>
                        <Button
                          className="my-3 btn btn-danger"
                          value={cartItem.id}
                          onClick={handleClick}
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </div>
                  ))
                ) : (
                  <>
                    {!loading && user && ( // Ocultar el mensaje si loading es true o si no hay usuario autenticado
                      <p className="fs-4 mb-3 fw-bold text-center">No hay productos en el carrito</p>
                    )}
                  </>
                )}
              </>
            )}
            {cartItems.length > 0 && (
              <div className="fw-bold fs-4 mb-3 text-center">
                Total: ${totalPrice.toFixed(2)}
              </div>
            )}
            {cartItems.length > 0 && (
              <Button
                className="d-grid gap-2 col-3 mx-auto my-3 btn btn-primary"
                onClick={handlePayment}
              >
                Pagar
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

