import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSelect, Button, Table, Container } from "react-bootstrap";
import { getAllUsers, putUser } from "../../../redux/action";

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

  return (
    <Container className="mt-3">
      <div className="mb-3">
        <label htmlFor="statusSelect" className="form-label">
          Seleccionar estatus
        </label>
        <FormSelect
          id="statusSelect"
          name="statusSelect"
          onChange={handleFilter}
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
      {users.length ? (
        <Table striped bordered hover>
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
                      variant={user.status ? "danger" : "success"}
                      onClick={() => {
                        handleActivate(statusSelection, user.id, user.status);
                      }}
                      className="me-2"
                    >
                      {user.status ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleModifyUserInfo(user.id)}
                    >
                      Modificar datos personales
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2>NO HAY USUARIOS PARA MOSTRAR</h2>
      )}
    </Container>
  );
}

export default AdminClients;
