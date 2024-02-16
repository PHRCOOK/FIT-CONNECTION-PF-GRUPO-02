// const {DataTypes} = require("sequelize")

// module.exports = (sequelize) => {
//   sequelize.define("User",{
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: { // Le agregamos una validación de formato.
//           isEmail: {
//             msg: "El formato del correo electrónico no es valido.",
//           },
//         },
//       },
//       sub: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       status: { // Atributo que usamos para desactivar/eliminar el usuario de ser necesario.
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       is_admin: { // Atributo para modificar un usuario registrado para que tenga el rol de administrador.
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       }
//     },
//     {timestamps: false},
//   );
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El formato del correo electrónico no es válido.",
          },
          isEmailFormat(value) {
            if (
              !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value)
            ) {
              throw new Error(
                "El formato del correo electrónico no es válido."
              );
            }
          },
        },
      },
      sub: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
