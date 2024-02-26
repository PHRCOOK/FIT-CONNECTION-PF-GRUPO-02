import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import {
  Button,
  FormControl,
  Container,
  Card,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const userShopping = useSelector((state) => state.userShopping) ?? {};
  const { is_admin, id } = userShopping;
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUsersList] = useState([]);
  const [messageInput, setMessageInput] = useState({
    from_user_id: null,
    message: "",
    to_user_id: null,
    sender_type: false,
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(
      "fit-connection-pf-grupo-02-production.up.railway.app"
    );
    setSocket(newSocket);

    newSocket.on(`message to ${id}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      Swal.fire({
        icon: "warning",
        title: "Nuevo mensaje!",
        text: "Te ha llegado un nuevo mensaje.",
      });
    });

    newSocket.on(`message from ${id}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (!is_admin) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/messages/${id}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error al obtener los mensajes:", error);
        }
      };

      fetchMessages();
      setMessageInput({
        from_user_id: id,
        message: "",
        to_user_id: "admin",
        sender_type: false,
      });
    }
  }, [id]);

  const getUsers = async () => {
    try {
      const users = await axios.get("/api/users");
      setUsersList(users.data.Items);
    } catch (error) {
      console.log("error al obtener usuarios");
    }
  };

  useEffect(() => {
    if (is_admin) {
      setMessageInput({
        from_user_id: id,
        message: "",
        to_user_id: null,
        sender_type: true,
      });
      getUsers();
    }
  }, [id]);

  const loadMessages = async (user_id) => {
    try {
      const response = await axios.get(`/api/messages/${user_id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  const handleUserSelect = (userId, fullname) => {
    setMessages([]);
    setSelectedUser(fullname);
    loadMessages(userId);
    setMessageInput({ ...messageInput, to_user_id: userId });
  };

  const handleMessageSend = async () => {
    if (!messageInput.message.length) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No se pueden enviar mensajes vacíos",
      });
      return;
    }

    if (socket) {
      socket.emit("sendMessage", { ...messageInput });
      setMessageInput({ ...messageInput, message: "" });
    }
  };

  return (
    <Container className="my-4">
      <Row>
        {is_admin && (
          <>
            <Col xs={12} md={3}>
              <div className="p-3">
                <h2>Lista de Usuarios</h2>
                <Card>
                  <ListGroup variant="flush">
                    {userList
                      .filter((user) => user.id !== id)
                      .map((user) => (
                        <ListGroup.Item
                          key={user.id}
                          action
                          onClick={() => handleUserSelect(user.id, user.name)}
                        >
                          {user.name}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Card>
              </div>
            </Col>
            <Col xs={12} md={9}>
              {selectedUser && (
                <div className="p-3">
                  <Card>
                    <Card.Header>
                      <h2>Conversación con {selectedUser}</h2>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        {messages.map((message, index) => (
                          <div key={index} className="mb-2">
                            {message.sender_type !== true ? (
                              <p className="text-primary">
                                {selectedUser} : {message.message}
                              </p>
                            ) : (
                              <p className="text-danger">
                                Admin : {message.message}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <FormControl
                        as="textarea"
                        value={messageInput.message}
                        onChange={(e) =>
                          setMessageInput({
                            ...messageInput,
                            message: e.target.value,
                          })
                        }
                      />
                      <Button
                        className="btn-primary mt-2"
                        onClick={handleMessageSend}
                      >
                        Enviar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </Col>
          </>
        )}

        {!is_admin && (
          <Col xs={12}>
            <div className="p-3">
              <Card>
                <Card.Header>
                  <h2>Conversación con Admin</h2>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    {messages.map((message, index) => (
                      <div key={index} className="mb-2">
                        {Number(message.from_user_id) !== Number(id) ? (
                          <p className="text-danger">
                            Admin : {message.message}
                          </p>
                        ) : (
                          <p className="text-primary">Tú : {message.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <FormControl
                    as="textarea"
                    value={messageInput.message}
                    onChange={(e) =>
                      setMessageInput({
                        ...messageInput,
                        message: e.target.value,
                      })
                    }
                  />
                  <Button
                    className="btn-primary mt-2"
                    onClick={handleMessageSend}
                  >
                    Enviar
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ChatComponent;
