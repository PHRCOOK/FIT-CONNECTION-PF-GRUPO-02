/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../redux/action";

import { deleteCategory } from "../../../redux/action";

function Admincategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id));
      window.alert("Categoria borrada correctamente");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleModify = (id) => {
    navigate(`/admin/categories/modify/${id}`);
  };

  const handleCreateCategory = () => {
    navigate("/admin/categories/create");
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

export default Admincategories;
