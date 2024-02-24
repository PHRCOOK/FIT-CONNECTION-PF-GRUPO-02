const { Op } = require("sequelize");
const { User } = require("../db");
const { transporter } = require("../../utils/transporter");
const { generateWelcomeEmail } = require("../../utils/emailTemplates");
const { deactivatedUserEmail } = require("../../utils/deactivatedUserEmail");
const { modifyUserData } = require("../../utils/modifyUserData");
const { activateUserEmail }= require("../../utils/activateUserEmail")
const { MAIL_USERNAME } = process.env;

// Controler encargado de crear los usuarios.
const createUserController = async (name, email, subAfterPipe) => {
  try {
    // Creamos una validación para que verifique si el usario ya existe por su propiedad email.
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExists) {
      // Si el usuario ya existe, simplemente retornamos el usuario existente.
      return {
        message: "Usuario ya existe, continuando con el inicio de sesión.",
        userExists,
      };
    }

    const sub = subAfterPipe;
    const allUsers = await User.create({ name, email, sub });

    const affair = "¡ Bienvenido a nuestro gimnasio !";
    const htmlBody = generateWelcomeEmail(name);

    await transporter.sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: affair,
      html: htmlBody,
    });

    return { message: "Usuario creado con exito.", allUsers };
  } catch (error) {
    // Mostramos cualquier error que ocurra durante la creación del usuario.
    throw new Error(`Error al crear el usuario: ${error.message}.`);
  }
};

// En este controller podemos actualizar la información de un usuario.

// const updateUserController = async (id, newData) => {
//   try {
//     const user = await User.findByPk(id);

//     if (!user) {
//       throw new Error("Usuario no encontrado.");
//     }

//     // Almacenamos el estado actual del usuario antes de la actualización.
//     const estadoActual = user.status;
//     const updateUser = await user.update(newData);
//     // Si el estado cambió a false, enviamos correo de desactivación de cuenta y retornamos.
//     if (updateUser.status === false && estadoActual !== false) {
//       const affair = "¡Desactivación de cuenta!";
//       const htmlBody = deactivatedUserEmail(updateUser.name);

//       await transporter.sendMail({
//         from: MAIL_USERNAME,
//         to: updateUser.email,
//         subject: affair,
//         html: htmlBody,
//       });

//       return { message: "Cuenta desactivada correctamente." };
//     }

//     if (updateUser.status === true && estadoActual !== true) {
//       const affair = "¡Activación de cuenta!";
//       const htmlBody = activateUserEmail(updateUser.name);

//       await transporter.sendMail({
//         from: MAIL_USERNAME,
//         to: updateUser.email,
//         subject: affair,
//         html: htmlBody,
//       });

//       return { message: "Cuenta activada correctamente." };
//     }
//     // Comprobamos si newData contiene otras propiedades además de 'status'.
//     const hasOtherData = Object.keys(newData).some(key => key !== 'status');

//     if (hasOtherData) {

//       // Enviamos un correo electrónico para notificar que los datos han sido modificados.
//       const affair = "¡Modificación de datos de usuario!";
//       const htmlBody = modifyUserData(updateUser.name);

//       await transporter.sendMail({
//         from: MAIL_USERNAME,
//         to: updateUser.email,
//         subject: affair,
//         html: htmlBody,
//       });

//       return { message: "Usuario actualizado exitosamente.", usuario: updateUser };
//     } else {
//       return { message: "No se modificaron datos adicionales del usuario." };
//     }
//   } catch (error) {
//     throw new Error(`Error al actualizar el usuario: ${error.message}`);
//   }
// };
const updateUserController = async (id, newData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // Almacenamos el estado actual del usuario antes de la actualización.
    const estadoActual = user.status;
    const updateUser = await user.update(newData);
    
    // Si el estado cambió a false, enviamos correo de desactivación de cuenta y retornamos.
    if (updateUser.status === false && estadoActual !== false) {
      const affair = "¡Desactivación de cuenta!";
      const htmlBody = deactivatedUserEmail(updateUser.name);

      await transporter.sendMail({
        from: MAIL_USERNAME,
        to: updateUser.email,
        subject: affair,
        html: htmlBody,
      });

      return { message: "Cuenta desactivada correctamente." };
    }

    if (updateUser.status === true && estadoActual !== true) {
      const affair = "¡Activación de cuenta!";
      const htmlBody = activateUserEmail(updateUser.name);

      await transporter.sendMail({
        from: MAIL_USERNAME,
        to: updateUser.email,
        subject: affair,
        html: htmlBody,
      });

      return { message: "Cuenta activada correctamente." };
    }
    
    // Comprobamos si newData contiene otras propiedades además de 'status'.
    const hasOtherData = Object.keys(newData).some(key => key !== 'status');

    // Si newData contiene otras propiedades y no es solo la modificación del estado, enviamos el correo de modificación de datos.
    if (hasOtherData) {
      const affair = "¡Modificación de datos de usuario!";
      const htmlBody = modifyUserData(updateUser.name);

      await transporter.sendMail({
        from: MAIL_USERNAME,
        to: updateUser.email,
        subject: affair,
        html: htmlBody,
      });

      return { message: "Usuario actualizado exitosamente.", usuario: updateUser };
    } else {
      return { message: "No se modificaron datos adicionales del usuario." };
    }
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
        ["name", "ASC"],
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
      order: [["name", "ASC"]],
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
const getUserByNameController = async (name) => {
  try {
    const userByName = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Lo usamos para realizar comparaciones de cadenas sin distinción entre mayúsculas y minúsculas.
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
      attributes: ["name", "email", "is_admin", "status", "sub"],
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Este controller nos permite realizar la busqueda de un usuario por su email.
const getUserByEmailController = async (email) => {
  try {
    const userByEmail = await User.findOne({
      where: {
        email: { [Op.iLike]: email },
      },
      attributes: ['id', 'name', 'email', 'is_admin'],
    });

    if (!userByEmail) {
      throw new Error("No existe un usuario con ese email.");
    }

    return userByEmail;
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
  getUserByEmailController,

};
