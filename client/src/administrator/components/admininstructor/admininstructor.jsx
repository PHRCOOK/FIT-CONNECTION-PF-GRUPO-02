/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      window.alert("Instructor borrado correctamente");
    } catch (error) {
      window.alert(error);
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

export default AdminInstructor;
