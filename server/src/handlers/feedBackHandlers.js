const { validateCreateFeedBack } = require("../../utils/validations/validateCreateFeedBack");
const { createFeedBackController } = require("../controllers/feedBackControllers");


const createFeedBackHandler = async (req, res) => {
    const { comment, raiting, post_at, user_id, instructor_id } = req.body;

    try {
        validateCreateFeedBack({ comment, raiting, post_at, user_id, instructor_id });
        const response = await createFeedBackController(comment, raiting, post_at, user_id, instructor_id);
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message });
    };
};


module.exports = {
    createFeedBackHandler,

};