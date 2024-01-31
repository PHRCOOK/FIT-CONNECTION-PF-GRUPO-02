const {DataTypes} = require("sequelize")

module.exports = (sequelize) => { 
  sequelize.define("User",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { // Le agregamos una validación de formato.
          isEmail: {
            msg: "You must enter a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { // Le agregamos una validación de formato y una función personalizada. 
          isStrongPassword(value) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(value)) {
              throw new Error("The password must contain at least 8 characters, at least one number, one lowercase letter and one uppercase letter.");
            }
          },
        },
      },
      status: { // Atributo que usamos para desactivar/eliminar el usuario de ser necesario.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_admin: { // Atributo para modificar un usuario registrado para que tenga el rol de administrador.
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }  
    },
    {timestamps: false},
  );
};