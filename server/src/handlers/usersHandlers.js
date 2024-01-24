const { createUserController } = require("../controllers/usersControllers");


const createUserHandler = async (req, res) => {
    const { fullname, email, password} = req.body;
    try {
        const response = await createUserController(fullname, email, password) // Ejecutamos el controller.
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
};


module.exports = {
    createUserHandler,
    
}