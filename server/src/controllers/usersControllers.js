const { User } = require("../db");


// Controler encargado de crear los usuarios.
const createUserController = async (fullname, email, password) => { 
    try {
        // Creamos una validación para que verifique si el usario ya existe por su propiedad email.
        const userExists = await User.findOne({
            where: { 
                email: email,
            }
        });
    
        if (userExists) {
            throw new Error("Ya existe un usuario con este email.")
        };
    
        const newUser = await User.create({ fullname, email, password });
    
        return newUser;
    } catch (error) {
         // Mostramos cualquier error que ocurra durante la creación del usuario.
         throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};


module.exports = {
    createUserController,

}