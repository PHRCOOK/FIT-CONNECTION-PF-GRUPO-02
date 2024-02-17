/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../../redux/action";

import { Button } from "react-bootstrap";

function Admincategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleDelete = (id) => {
    try {
      dispatch(deleteCategory(id));
      window.alert("Categoria borrada correctamente");
    } catch (error) {
      window.alert(error);
    }
  };

  const handleModify = (id) => {
    navigate(`/admin/category/modify/${id}`);
  };

  const handleCreateCategory = () => {
    navigate("/admin/category/create");
  };

  return (
    <div>
      <table>
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
          {allCategories.map((category) => {
            return (
              <tr key={category.name}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{String(category.status)}</td>
                <td>{String(category.is_service)}</td>
                <td>
                  <Button onClick={() => handleDelete(category.id)}>
                    Borrar
                  </Button>
                  <Button onClick={() => handleModify(category.id)}>
                    Modificar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={handleCreateCategory}>Crear categoria</Button>
    </div>
  );
}

export default Admincategories;
