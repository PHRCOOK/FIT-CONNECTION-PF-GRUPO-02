import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../../redux/action";
import Swal from "sweetalert2";
import { Button, Table, Container, FormSelect } from "react-bootstrap";
import pathroutes from "../../../components/helpers/pathroutes";

function Admincategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories);

  const [statusSelection, setStatusSelection] = useState(true);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDelete = (id, status) => {
    const newStatus = !status;
    try {
      dispatch(deleteCategory(id, { status: newStatus }));

      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: statusSelection
          ? "Categoría desactivada correctamente"
          : "Categoría activada correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al borrar categoría",
      });
    }
  };

  const handleModify = (id) => {
    navigate(`${pathroutes.ADMINCATEGORYMODIFY}/${id}`);
  };

  const handleCreateCategory = () => {
    navigate(pathroutes.ADMINCATEGORYCREATE);
  };

  const handleStatusSelect = (event) => {
    const status = event.target.value === "true";
    setStatusSelection(status);
  };

  return (
    <div>
      <Container>
        <div className="mb-3">
          <label htmlFor="statusSelect" className="form-label">
            Seleccionar estado
          </label>
          <FormSelect
            id="statusSelect"
            name="statusSelect"
            onChange={handleStatusSelect}
            aria-label="Default select example"
            value={statusSelection}
            className="form-select"
          >
            <option id="statusTrue" name="statusTrue" value={true}>
              Activos
            </option>
            <option id="statusFalse" name="statusFalse" value={false}>
              Inactivos
            </option>
          </FormSelect>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Categoría</th>
              <th>Estatus</th>
              <th>Es servicio?</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allCategories
              ?.filter((category) => category.status === statusSelection)
              .map((category) => (
                <tr key={category.name}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.status ? "Activo" : "Inactivo"}</td>
                  <td>{category.is_service ? "Si" : "No"}</td>
                  <td>
                    <Button
                      className={`mx-2 my-1 ${
                        statusSelection ? "btn-danger" : "btn-success"
                      }`}
                      onClick={() => handleDelete(category.id, category.status)}
                    >
                      {statusSelection ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      className="mx-2 my-1"
                      onClick={() => handleModify(category.id)}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Button onClick={handleCreateCategory}>Crear categoría</Button>
      </Container>
    </div>
  );
}

export default Admincategories;
