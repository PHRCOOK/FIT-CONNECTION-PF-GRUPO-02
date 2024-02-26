import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSelect, Button, Table, Container } from "react-bootstrap";
import { getAllUsers, putUser } from "../../../redux/action";
import Swal from "sweetalert2";

function AdminClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.allUsers);

  const [statusSelection, setStatusSelection] = useState(true);

  useEffect(() => {
    dispatch(getAllUsers(statusSelection));
  }, [dispatch, statusSelection]);

  const handleFilter = (event) => {
    const status = event.target.value === "true";
    setStatusSelection(status);
  };

  const handleActivate = async (id, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      await dispatch(putUser(statusSelection, id, { status: newStatus }));

      const alertText = newStatus ? "Usuario activado" : "Usuario desactivado";

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: alertText,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado del usuario",
      });
    }
  };

  const handleModifyUserInfo = (id) => {
    navigate(`/admin/client/modifyinfo/${id}`);
  };

  const handleChangeAdminAccess = (event) => {
    const { name, value, id } = event.target;

    if (
      users.filter((u) => u.is_admin).length <= 1 &&
      users.find((u) => u.id === Number(id)).is_admin
    ) {
      Swal.fire({
        title: "Error",
        text: "No pueden quitarse los permisos administrador a todos los usuarios",
        icon: "error",
        customClass: {
          confirmButton: "swal-btn-class",
        },
      });
      return;
    }

    dispatch(putUser(statusSelection, id, { [name]: value }));
  };

  return (
    <Container className="mt-3">
      <div className="mb-3">
        <label htmlFor="statusSelect" className="form-label">
          Seleccionar estado
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>e-mail</th>
              <th>Es Administrador?</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id + user.name}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <FormSelect
                    id={user.id}
                    name="is_admin"
                    onChange={handleChangeAdminAccess}
                    aria-label="Default select example"
                    value={user.is_admin}
                    className="form-select"
                  >
                    <option id="statusTrue" name="statusTrue" value={true}>
                      Si
                    </option>
                    <option id="statusFalse" name="statusFalse" value={false}>
                      No
                    </option>
                  </FormSelect>
                </td>
                <td>{user.status ? "Activo" : "Inactivo"}</td>
                <td>
                  <Button
                    variant={user.status ? "danger" : "success"}
                    onClick={() => handleActivate(user.id, user.status)}
                    className="me-2"
                    disabled={user.is_admin && user.status}
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
            ))}
          </tbody>
        </Table>
      ) : null}
    </Container>
  );
}

export default AdminClients;
