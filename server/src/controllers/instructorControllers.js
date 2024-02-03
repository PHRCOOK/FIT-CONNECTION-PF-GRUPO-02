const { Instructor } = require("../db");


// En este controller creamos un instructor en el Gym.
const createInstructorController = async (fullname, photo, description) => {
    try {
        const instrutorExists = await Instructor.findOne({
            where: {
                fullname: fullname,
            }
        });

        if (instrutorExists) {
            throw new Error("Ya existe un instructor con ese nombre.")
        };

        await Instructor.create({ fullname, photo, description });

        return { message: "Instructor creado exitosamente." };

    } catch (error) {
        throw new Error(`Error al crear el instructor: ${error.message}`);        
    };
};

// Este controller permite actualizar un instructor para que lo desactive o active si es necesario o lo convierta en administrador de la pagina.
const updateInstructorController = async (id, newDta) => {
    try {
        const instructor = await Instructor.findByPk(id);
        if (!instructor) {
            throw new Error("Instructor no encontrado.")
        };
        // Actualizamos la información del instructor.
        await instructor.update(newDta);

        return { message: "Instructor actualizado exitosamente." }

    } catch (error) {
        throw new Error(`Error al actualizar el instructor: ${error.message}`)
    };
};

// Este controller nos permite buscar los instructores del gimnasio.
const getInstructorsController = async () => {
    try {
        const instructors = await Instructor.findAll();  
        if (!instructors) {
            throw new Error('No existen instructores.')
        }      
        return instructors;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createInstructorController,
    updateInstructorController,
    getInstructorsController,

};
