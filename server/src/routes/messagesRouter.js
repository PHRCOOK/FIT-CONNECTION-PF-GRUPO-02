const { Router } = require("express");
const { Message } = require("../db");
const { Op } = require("sequelize");

const messagesRouter = Router();

messagesRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new Error("Invalid user");
  }

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { from_user_id: Number(userId) },
          { to_user_id: Number(userId) },
        ],
      },
    });

    if (!messages.length) {
      res.status(400).json({ message: "no hay mensajes del usuario" });
      return;
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
    console.log("error obteniendo usuarios", error);
  }
});

module.exports = messagesRouter;
