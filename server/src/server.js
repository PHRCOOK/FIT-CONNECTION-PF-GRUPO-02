const express = require("express");
const routes = require("./routes/index.js");
const cors = require("cors"); // Se agrega para que permita realizar las peticiones.
const morgan = require("morgan");
const { sequelize } = require("./db.js");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("clientConnected");
  socket.on("sendMessage", async (message) => {
    console.log(message);
    if (message.to_user_id === "admin") {
      try {
        const admin = await sequelize.models.User.findAll({
          where: { is_admin: true },
        });
        // Aquí puedes usar la conexión de sequelize para guardar el mensaje en la base de datos
        admin.forEach(async (admin) => {
          await sequelize.models.Message.create({
            from_user_id: Number(message.from_user_id),
            to_user_id: Number(admin.id),
            message: message.message,
            sender_type: message.sender_type,
          });
        });
      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
      }
    } else {
      await sequelize.models.Message.create({
        from_user_id: Number(message.from_user_id),
        to_user_id: Number(message.to_user_id),
        message: message.message,
        sender_type: message.sender_type,
      });
    }

    io.emit(`message to ${message.to_user_id}`, message);
    io.emit(`message from ${message.from_user_id}`, message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Middlerware que nos permite visualizar los errores en la terminal.

app.use("/", routes);

module.exports = server;
