/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteCategory } from "../../../redux/action";

function admincategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories);
  console.log(allCategories);
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    window.alert("Categoria borrada correctamente");
  };

  const handleModify = (id) => {
    navigate(`/admin/modifycategory/${id}`);
  };

  const handleCreateCategory = () => {
    navigate("/admin/createcategory");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {allCategories.map((category) => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleDelete(category.id)}>
                  Borrar
                </button>
                <button onClick={() => handleModify(category.id)}>
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateCategory}>Crear categoria</button>
    </div>
  );
}

export default admincategories;
