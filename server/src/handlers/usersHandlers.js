const { 
    createUserController,
    getActiveUsersController,
    getUserByNameController,
    getInactiveUsersController,
    updateUserController,
    getUserByIdController,

} = require("../controllers/usersControllers");
// Handler para manejar la cración de un usuario.
const createUserHandler = async (req, res) => {
    const { fullname, email, password} = req.body;
    try {
        validateCreateUser({ fullname, email, password });
        const response = await createUserController(fullname, email, password); 
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
>>>>>>> 42ee38c249df9b7a73acb4dc7581591d5837272a
    };
};

// Este handler maneja la actualización de la información de un usuario dependiendo de lo que llegue por body.
const updateUserHandler = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password, status } = req.body;

    try {
        const response = await updateUserController(id, { fullname, email, password, status });
        res.status(200).json(response);
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(400).json({ error: error.message })
=======
        res.status(404).json({ error: error.message })
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
=======
        res.status(404).json({ error: error.message })
>>>>>>> 42ee38c249df9b7a73acb4dc7581591d5837272a
    }
};

// Manejamos mostrar los usuarios que estan activos o si llega una busqueda por un nombre en específico.
const getActiveUsersHandler = async (req, res) => {
    const { fullname } = req.query;
    try {
        const response = fullname ? await getUserByNameController(fullname) : await getActiveUsersController();
        res.status(200).send(response)
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(400).json({error: error.message})        
=======
        res.status(404).json({error: error.message})        
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
=======
        res.status(404).json({error: error.message})        
>>>>>>> 42ee38c249df9b7a73acb4dc7581591d5837272a
    };
};

// Handler para mostrar los usuarios que estan inactivos.
const getInactiveUsersHandler = async (req, res) => {
    try {
        const response = await getInactiveUsersController();
        res.status(200).send(response)
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(400).json({error: error.message})
=======
        res.status(404).json({error: error.message})
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
=======
        res.status(404).json({error: error.message})
>>>>>>> 42ee38c249df9b7a73acb4dc7581591d5837272a
    };
};

// Con este hanlder mostramos en detalle un usuario identificandolo por su id.
const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getUserByIdController(id);
        res.status(200).json(response);
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
        res.status(400).json({error: error.message})
=======
        res.status(404).json({error: error.message})
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
=======
        res.status(404).json({error: error.message})
>>>>>>> 42ee38c249df9b7a73acb4dc7581591d5837272a
    };
};

module.exports = {
    createUserHandler,
    getActiveUsersHandler,
    updateUserHandler, 
    getInactiveUsersHandler,
    getDetailHandler,
    
}