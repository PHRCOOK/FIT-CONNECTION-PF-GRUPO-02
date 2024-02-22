import React, { useEffect, useState } from "react";
import { Container, FormSelect, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { format } from "date-fns";

function AdminFeedbacks() {
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const [statusSelection, setStatusSelection] = useState(true);

  const handleFilter = (event) => {
    const status = event.target.value === "true";
    setStatusSelection(status);
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios("/api/feedbacks");
      setComments(data.Items);
    } catch (error) {
      console.log(error);
      // const message = error.response.data.error;
      Swal.fire("Error", "Error al cargar los comentarios", "error");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    // console.log(comments);
  }, [comments]);

  const handleStatus = (statusSelection, feedbackId, currentStatus) => {};

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
      {comments.length ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id del comentario</th>
              <th>Nombre del usuario</th>
              <th>Nombre del entrenador</th>
              <th>Comentario</th>
              <th>Calificación</th>
              <th>Estatus</th>
              <th>Fecha y hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((feedback) => feedback.status === statusSelection)
              .map((comment) => {
                return (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.User.name}</td>
                    <td>{comment.Instructor.fullname}</td>
                    <td>{comment.comment}</td>
                    <td>{comment.raiting}</td>
                    <td>{comment.status ? "Activo" : "Inactivo"}</td>
                    <td>
                      {format(new Date(comment.post_at), "dd/MM/yyyy HH:mm:ss")}
                    </td>
                    <td>
                      <Button
                        variant={comment.status ? "danger" : "primary"}
                        onClick={() => {
                          handleStatus(
                            statusSelection,
                            comment.id,
                            comment.status
                          );
                        }}
                        className="me-2"
                      >
                        {comment.status ? "Desactivar" : "Activar"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <h2>NO HAY COMENTARIOS PARA MOSTRAR</h2>
      )}
    </Container>
  );
}

export default AdminFeedbacks;
