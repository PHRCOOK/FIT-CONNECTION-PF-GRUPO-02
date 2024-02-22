const { validateCreateClientInfo } = require("../../utils/validations/validateCreateClientInfo");
const { 
    createClientInfoController, 
    updateClientInfoController, 
    getClientInfoController 
} = require("../controllers/clientInfoController");


// Este handler nos permite manejar la información para crear la información de un usuario.
const createClientInfoHandler = async (req, res) => {
    const { user_id } = req.params;
    const { address, phone, dni, birth_date } = req.body;
    try {
        validateCreateClientInfo({ address, phone, dni, birth_date })
        const response = await createClientInfoController(user_id, address, phone, dni, birth_date)
        res.status(201).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// Este handler maneja la actualización de la información de un usuario dependiendo de lo que llegue por body.
const updateClientInfoHandler = async (req, res) => {
    const { user_id } = req.params;
    const { address, phone, dni, birth_date } = req.body;

    try {
        const response = await updateClientInfoController(user_id, { address, phone, dni, birth_date })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// Este Handler maneja la busqueda de un usuario.
const getClientInfoHandler = async (req, res) => {
    const { user_id } = req.params;
    try {
        const response = await getClientInfoController(user_id);
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createClientInfoHandler,
    updateClientInfoHandler,
    getClientInfoHandler,
    
}