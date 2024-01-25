const { Instrutor } = require("../db");


// En este controller creamos un instructor en el Gym.
const createInstructorController = async (fullname, photo, description) => {
    try {
        const instrutorExists = await Instrutor.findOne({
            where: {
                fullname: fullname,
            }
        });

        if (instrutorExists) {
            throw new Error("Ya existe un instructor con ese nombre.")
        };

        await Instrutor.create({ fullname, photo, description });

        return { message: "Instructor creado exitosamente." };

    } catch (error) {
        throw new Error(`Error al crear el instructor: ${error.message}`);        
    };
};


module.exports = createInstructorController;

