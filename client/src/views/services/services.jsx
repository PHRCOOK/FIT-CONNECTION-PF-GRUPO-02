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
      <div className="fs-4 mb-3 fw-bold text-center">Membresías</div>{" "}
      <MembershipsCards statusSelection={true} />
    </div>
  );
}

export default Services;
