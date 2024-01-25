const createInstructorController = require("../controllers/createInstructorController");

const createInstructorHandler = async (req, res) => {
    const { fullname, photo, description } = req.body;

    try {
        const response = await createInstructorController(fullname, photo, description);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    };
};

module.exports = createInstructorHandler;