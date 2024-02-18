/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../../redux/action";
import Swal from "sweetalert2";

import { Button, Table, Container } from "react-bootstrap";

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
      Swal.fire({
        icon:"success",
        title:"Proceso Exitoso",
        text:"Categoria borrada correctamente",
      })
    } catch (error) {
      Swal.fire({
        icon:"error",
        title:"Error",
        text: "Error al borrar categoria",
      })
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
      <Container>

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
            {allCategories.map((category) => {
              return (
                <tr key={category.name}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{String(category.status)}</td>
                  <td>{String(category.is_service)}</td>
                  <td>
                    <Button className="mx-2 my-1" onClick={() => handleDelete(category.id)}>
                      Borrar
                    </Button>
                    <Button className="mx-2 my-1" onClick={() => handleModify(category.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button onClick={handleCreateCategory}>Crear categoria</Button>
      </Container>
    </div>
  );
}

export default Admincategories;
