// import MembershipsCards from "../../components/cards_memberships/cards_memberships";

// import { useEffect } from "react";

// function services() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div>
//       <h1>MEMBRESIAS</h1>
//       <MembershipsCards statusSelection={true} />
//     </div>
//   );
// }

// export default services;
import MembershipsCards from "../../components/cards_memberships/cards_memberships";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMemberships } from "../../redux/action";

function Services() {
  const dispatch = useDispatch();

  // Llama a la acción getAllMemberships cuando el componente se monta
  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  // Desplazarse hacia arriba al cargar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>MEMBRESIAS</h1>
      <MembershipsCards statusSelection={true} />
    </div>
  );
}

export default Services;
