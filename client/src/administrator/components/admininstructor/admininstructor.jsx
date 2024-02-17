/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap";
import Swal from "sweetalert2";

import { deleteInstructor, getAllInstructors } from "../../../redux/action";

function AdminInstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteInstructor(id));
      Swal.fire({
        icon:"success",
        title:"Proceso Exitoso",
        text:"Instructor borrado correctamente",
      })
    } catch (error) {
      Swal.fire({
        icon:"error",
        title:"Error",
        text:"Error al borrar instructor",
      })
    }
  };

  const handleModify = (id) => {
    navigate(`/admin/instructor/modify/${id}`);
  };

  const handleCreateInstructor = () => {
    navigate("/admin/instructor/create");
  };

  return (
    <div>
      <Container>

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
            {allInstructors.map((instructor) => {
              console.log(instructor);
              return (
                <tr key={instructor.id}>
                  <td>{instructor.id}</td>
                  <td>{instructor.fullname}</td>
                  <td>{String(instructor.status)}</td>
                  <td>
                    <Button className="mx-2 my-1" onClick={() => handleDelete(instructor.id)}>
                      Borrar
                    </Button>
                    <Button className="mx-2 my-1" onClick={() => handleModify(instructor.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button onClick={handleCreateInstructor}>Crear instructor</Button>
      </Container>
    </div>
  );
}

export default AdminInstructor;
