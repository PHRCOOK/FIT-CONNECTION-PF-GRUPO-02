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
          // Le agregamos una validación de zzzzzformato.
          isEmail: {
            msg: "El formato del correo electrónico no es valido.",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // Le agregamos una validación de formato y una función personalizada.
          isStrongPassword(value) {
            const passwordRegex =
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(value)) {
              throw new Error(
                "La contraseña debe contener al menos 8 caracteres, al menos un número, una letra minúscula y una letra mayúscula"
              );
            }
          },
        },
      },
      status: {
        // Atributo que usamos para desactivar/eliminar el usuario de ser necesario.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_admin: {
        // Atributo para modificar un usuario registrado para que tenga el rol de administrador.
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
