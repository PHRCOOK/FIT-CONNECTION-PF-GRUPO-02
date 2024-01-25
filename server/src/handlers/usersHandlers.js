const { 
    createUserController,
    getActiveUsersController,
    getUserByNameController,
    getInactiveUsersController,
    updateUserController,
    getUserByIdController,

} = require("../controllers/usersControllers");


const createUserHandler = async (req, res) => {
    const { fullname, email, password} = req.body;
    try {
        const response = await createUserController(fullname, email, password) // Ejecutamos el controller.
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

const updateUserHandler = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password, status } = req.body;

    try {
        const response = await updateUserController(id, { fullname, email, password, status });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const getActiveUsersHandler = async (req, res) => {
    const { fullname } = req.query;
    try {
        const response = fullname ? await getUserByNameController(fullname) : await getActiveUsersController();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})        
    };
};

const getInactiveUsersHandler = async (req, res) => {
    try {
        const response = await getInactiveUsersController();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getUserByIdController(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};

module.exports = {
    createUserHandler,
    getActiveUsersHandler,
    updateUserHandler, 
    getInactiveUsersHandler,
    getDetailHandler,
    
}