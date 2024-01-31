const { 
    createUserController,
    getActiveUsersController,
    getUserByNameController,
    getInactiveUsersController,
    updateUserController,
    getUserByIdController,

} = require("../controllers/usersControllers");
const { validateCreateUser } = require("../../utils/validations/validateCreateUser");


// Handler para manejar la cración de un usuario.
const createUserHandler = async (req, res) => {
    const { fullname, email, password} = req.body;
    try {
        validateCreateUser({ fullname, email, password });
        const response = await createUserController(fullname, email, password) 
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
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
        res.status(404).json({ error: error.message })
    }
};

// Manejamos mostrar los usuarios que estan activos o si llega una busqueda por un nombre en específico.
const getActiveUsersHandler = async (req, res) => {
    const { fullname } = req.query;
    try {
        const response = fullname ? await getUserByNameController(fullname) : await getActiveUsersController();
        res.status(200).send(response)
    } catch (error) {
        res.status(404).json({error: error.message})        
    };
};

// Handler para mostrar los usuarios que estan inactivos.
const getInactiveUsersHandler = async (req, res) => {
    try {
        const response = await getInactiveUsersController();
        res.status(200).send(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    };
};

// Con este hanlder mostramos en detalle un usuario identificandolo por su id.
const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getUserByIdController(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message})
    };
};

module.exports = {
    createUserHandler,
    getActiveUsersHandler,
    updateUserHandler, 
    getInactiveUsersHandler,
    getDetailHandler,
    
}