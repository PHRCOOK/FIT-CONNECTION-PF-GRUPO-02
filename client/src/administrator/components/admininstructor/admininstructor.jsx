/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container, FormSelect } from "react-bootstrap";
import Swal from "sweetalert2";

import { deleteInstructor, getAllInstructors } from "../../../redux/action";

function AdminInstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allInstructors = useSelector((state) => state.allInstructors);

  const [statusSelection, setStatusSelection] = useState(true);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, []);

  const handleDelete = (id, status) => {
    const newStatus = !status;
    console.log(newStatus);

    try {
      dispatch(deleteInstructor(id, { status: newStatus }));
      Swal.fire({
        icon: "success",
        title: "Proceso Exitoso",
        text: statusSelection
          ? "Instructor desactivado correctamente"
          : "Instructor activado correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al borrar instructor",
      });
    }
  };

  const handleModify = (id) => {
    navigate(`/admin/instructor/modify/${id}`);
  };

  const handleCreateInstructor = () => {
    navigate("/admin/instructor/create");
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
            Seleccionar estatus
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
        {!allInstructors.length ? (
          <h2>NO HAY INSTRUCTORES PARA MOSTRAR</h2>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Instructor</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allInstructors
                .filter((instructor) => instructor.status === statusSelection)
                .map((instructor) => {
                  return (
                    <tr key={instructor.id}>
                      <td>{instructor.id}</td>
                      <td>{instructor.fullname}</td>
                      <td>{instructor.status ? "Activo" : "Inactivo"}</td>
                      <td>
                        <Button
                          className="mx-2 my-1"
                          variant={instructor.status ? "danger" : "success"}
                          onClick={() =>
                            handleDelete(instructor.id, instructor.status)
                          }
                        >
                          {instructor.status ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          className="mx-2 my-1"
                          onClick={() => handleModify(instructor.id)}
                        >
                          Modificar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
        <Button onClick={handleCreateInstructor}>Crear instructor</Button>
      </Container>
    </div>
  );
}

export default AdminInstructor;
