import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSelect } from "react-bootstrap";
import { getAllUsers, putUser } from "../../../redux/action";
import { Button } from "react-bootstrap";

function AdminClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.allUsers);

  const [statusSelection, setStatusSelection] = useState(true);

  useEffect(() => {
    dispatch(getAllUsers(statusSelection));
  }, [statusSelection]);

  const handleFilter = (event) => {
    const status = event.target.value === "true";
    setStatusSelection(status);
  };

  const handleActivate = (statusSelection, id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      dispatch(putUser(statusSelection, id, { status: newStatus }));
    } catch (error) {
      window.alert("No se pudo cambiar el status del usuario");
    }
  };

  const handleModifyUserInfo = (id) => {
    navigate(`/admin/client/modifyinfo/${id}`);
  };

  // const handleCreateUser = () => {
  //   navigate("/admin/category/create");
  // };

  return (
    <div>
      <div>
        <label htmlFor="statusSelect">Seleccionar estatus</label>
        <FormSelect
          id="statusSelect"
          name="statusSelect"
          onChange={handleFilter}
          aria-label="Default select example"
          value={statusSelection}
        >
          <option id="statusTrue" name="statusTrue" value={true}>
            Activos
          </option>
          <option id="statusFalse" name="statusFalse" value={false}>
            Inactivos
          </option>
        </FormSelect>
      </div>
      {users.length ? (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>e-mail</th>
              <th>Es Administrador?</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id + user.fullname}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.is_admin ? "Si" : "No"}</td>
                  <td>{user.status ? "Activo" : "Inactivo"}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleActivate(statusSelection, user.id, user.status);
                      }}
                    >
                      {user.status ? "Desactivar" : "Activar"}
                    </Button>
                    <Button onClick={() => handleModifyUserInfo(user.id)}>
                      Modificar datos personales
                    </Button>
                    <span>nota: es necesario este boton de modificar?</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h2>NO HAY USUARIOS PARA MOSTRAR</h2>
      )}
    </div>
  );
}

export default AdminClients;
