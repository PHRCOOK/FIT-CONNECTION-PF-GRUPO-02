<<<<<<< HEAD
=======
const { validateCreateInstructor } = require("../../utils/validations/validateCreateInstructor");
>>>>>>> 6d9e894bb91eb8bef73fb63f7e0b350ad3f62df6
const {createInstructorController, updateInstructorController} = require("../controllers/instructorControllers");

// Handler que permite manejar la creación de un instructor en la base de datos.
const createInstructorHandler = async (req, res) => {
    const { fullname, photo, description } = req.body;

    try {
<<<<<<< HEAD
        const response = await createInstructorController(fullname, photo, description);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
=======
        validateCreateInstructor({ fullname, photo, description })        
        const response = await createInstructorController(fullname, photo, description);
        res.status(201).json(response);
    } catch (error) {
        res.status(409).json({ error: error.message })
>>>>>>> 6d9e894bb91eb8bef73fb63f7e0b350ad3f62df6
    };
};

// Este handler nos permite actualizar la información de un instructor en la base de datos.
const updateInstructorHandler = async (req, res) => {
    const { id } = req.params;
    const { fullname, photo, description, status } = req.body;

    try {
        const response = await updateInstructorController(id, { fullname, photo, description, status });
        res.status(200).json(response);
    } catch (error) {
<<<<<<< HEAD
        res.status(400).json({ error: error.message });
=======
        res.status(404).json({ error: error.message });
>>>>>>> 6d9e894bb91eb8bef73fb63f7e0b350ad3f62df6
    };
};

module.exports = {
    createInstructorHandler,
    updateInstructorHandler,
    
};