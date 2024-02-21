import io from "socket.io-client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const { is_admin, id } = useSelector((state) => state.userShopping);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUsersList] = useState([]);
  const [messageInput, setMessageInput] = useState({
    from: null,
    message: "",
    to: null,
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001"); // Reemplaza con la URL de tu servidor Socket.io
    setSocket(newSocket);

    // Escucha los mensajes para el usuario actual
    newSocket.on(`message to ${id}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message.message]);
    });

    // Escucha los mensajes para el destinatario actual
    newSocket.on(`message to ${messageInput.to}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message.message]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!is_admin) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/messages/${id}`
          );

          setMessages(response.data);
        } catch (error) {
          console.error("Error al obtener los mensajes:", error);
        }
      };

      fetchMessages();
      setMessageInput({ from: id, message: "", to: "admin" });
    }
  }, [id]);

  const getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:3001/api/users");

      setUsersList(users.data.Items);
    } catch (error) {
      console.log("error al obtener usuarios");
    }
  };
  useEffect(() => {
    if (is_admin) {
      setMessageInput({ from: id, message: "", to: null });
      getUsers();
    }
  }, []);
  // Aquí puedes tener una función para cargar el historial de mensajes con un usuario específico

  const loadMessages = async (user_id) => {
    // Lógica para cargar mensajes desde el backend, por ejemplo, utilizando una solicitud HTTP
    // Una vez que obtengas los mensajes, actualiza el estado 'messages'
    try {
      const response = await axios.get(
        `http://localhost:3001/api/messages/${user_id}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  // Manejar cambio de usuario seleccionado
  const handleUserSelect = (userId, fullname) => {
    setSelectedUser(fullname);
    loadMessages(userId);
    setMessageInput({ ...messageInput, to: userId });
  };

  // Manejar envío de mensaje
  const handleMessageSend = () => {
    // Lógica para enviar el mensaje al backend y actualizar el estado 'messages'
    if (socket) {
      // Enviar una copia del mensaje actual
      socket.emit("sendMessage", { ...messageInput });
      // Limpiar el campo del mensaje después de enviarlo
      setMessageInput({ ...messageInput, message: "" });
      setMessages([...messages, messageInput]);
    }
  };

  return (
    <div>
      {is_admin && (
        <div>
          <h2>Lista de Usuarios</h2>
          {/* Aquí puedes mostrar la lista de usuarios */}
          {/* Ejemplo básico */}
          <ul>
            {userList
              .filter((user) => user.id !== id)
              .map((user) => (
                <li onClick={() => handleUserSelect(user.id, user.name)}>
                  {user.name}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Mostrar historial de mensajes si un usuario ha sido seleccionado */}
      {selectedUser && (
        <div>
          <h2>Conversación con {selectedUser}</h2>
          <div>
            {/* Aquí puedes mostrar el historial de mensajes */}
            {/* Ejemplo básico */}
            {messages.map((message, index) => (
              <div key={index}>{message.message}</div>
            ))}
          </div>
          {/* Input para enviar mensaje */}
          <input
            type="text"
            value={messageInput.message}
            onChange={(e) =>
              setMessageInput({ ...messageInput, message: e.target.value })
            }
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      )}

      {!is_admin && (
        <div>
          {/* Mostrar historial de mensajes */}
          {messages.map((message, index) => (
            <div key={index}>{message.message}</div>
          ))}
          {/* Input para enviar mensaje */}
          <input
            type="text"
            value={messageInput.message}
            onChange={(e) =>
              setMessageInput({ ...messageInput, message: e.target.value })
            }
          />
          <button onClick={handleMessageSend}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;