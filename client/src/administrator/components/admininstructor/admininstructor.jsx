/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteInstructor } from "../../../redux/action";

function admininstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allInstructors = useSelector((state) => state.allInstructors);

  const handleDelete = (id) => {
    dispatch(deleteInstructor(id));
    window.alert("Instructor borrado correctamente");
  };

  const handleModify = (id) => {
    navigate(`/admin/modifyinstructor/${id}`);
  };

  const handleCreateInstructor = () => {
    navigate("/admin/createinstructor");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allInstructors.map((instructor) => (
            <tr key={instructor.id}>
              <td>{instructor.fullname}</td>
              <td>
                <button onClick={() => handleDelete(instructor.id)}>
                  Borrar
                </button>
                <button onClick={() => handleModify(instructor.id)}>
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateInstructor}>Crear instructor</button>
    </div>
  );
}

export default admininstructor;
