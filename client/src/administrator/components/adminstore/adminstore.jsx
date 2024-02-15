import Filters from "../../../components/filters/filters";
import Cards from "../../../components/cards/cards";
import Page from "../../../components/page/page";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pathroutes from "../../../components/helpers/pathroutes";

function AdminStore() {
  const navigate = useNavigate();
  const handleCreateProduct = () => {
    navigate(pathroutes.FORMPRODUCT);
  };
  return (
    <div>
      <Filters />
      <Button onClick={handleCreateProduct}>Crear producto</Button>
      <Cards />
      <Page />
    </div>
  );
}

export default AdminStore;
