const { Op } = require("sequelize");
const { User } = require("../db");

// Controler encargado de crear los usuarios.
const createUserController = async (fullname, email, password) => {
  try {
    // Creamos una validación para que verifique si el usario ya existe por su propiedad email.
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new Error("Ya existe un usuario con este email.");
    }

    await User.create({ fullname, email, password });
    const allUsers = await User.findAll();

    return { message: "Usuario creado con exito.", allUsers };
  } catch (error) {
    // Mostramos cualquier error que ocurra durante la creación del usuario.
    throw new Error(`Error al crear el usuario: ${error.message}.`);
  }
};

// En este controller podemos actualizar la información de un usuario.
const updateUserController = async (id, newData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // Actualizamos la información del usuario.
    await user.update(newData);

    return { message: "Usuario actualizado exitosamente." };
  } catch (error) {
    throw new Error(`Error al actualizar el usuario: ${error.message}`);
  }
};

// Controller que busca todos los usarios que esten activos.
const getActiveUsersController = async () => {
  try {
    const users = await User.findAll({
      where: {
        // Traemos solo los usuarios que estan activos.
        status: true,
      },
      order: [
        // Le decimos que los resultados deben venir ordenados alfabéticamente por el nombre.
        ["fullname", "ASC"],
      ],
    });

    if (users.length === 0) {
      throw new Error("No existen usuarios activos.");
    }

    return { Items: users };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que nos trae los usuarios que esten inactivos/eliminados.
const getInactiveUsersController = async () => {
  try {
    const inactiveUsers = await User.findAll({
      // Que su propiedad active este en "false" y los muestre en orden alfabético.
      where: {
        status: false,
      },
      order: [["fullname", "ASC"]],
    });

    if (inactiveUsers.length === 0) {
      throw new Error("No existen usuarios inactivos.");
    }

    return { Items: inactiveUsers };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que nos trae solo un usuario por su nombre.
const getUserByNameController = async (fullname) => {
  try {
    const userByName = await User.findAll({
      where: {
        fullname: {
          [Op.iLike]: fullname, // Lo usamos para realizar comparaciones de cadenas sin distinción entre mayúsculas y minúsculas.
        },
      },
    });

    if (userByName.length === 0) {
      throw new Error("No existe un usuario con ese nombre.");
    }

    return userByName;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que muestra info especifica de un usuario por su id.
const getUserByIdController = async (id) => {
  try {
    const userById = User.findByPk(id, {
      attributes: ["fullname", "email", "is_admin", "status", "password"],
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserController,
  getActiveUsersController,
  getUserByNameController,
  updateUserController,
  getInactiveUsersController,
  getUserByIdController,
};
