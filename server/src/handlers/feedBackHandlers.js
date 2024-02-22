const {
  validateCreateFeedBack,
} = require("../../utils/validations/validateCreateFeedBack");
const {
  createFeedBackController,
  getFeedBacksController,
  getFeedBackByNameController,
  putFeedBackController,
} = require("../controllers/feedBackControllers");

const createFeedBackHandler = async (req, res) => {
  const { comment, raiting, post_at, user_id, instructor_id } = req.body;

  try {
    validateCreateFeedBack({
      comment,
      raiting,
      post_at,
      user_id,
      instructor_id,
    });
    const response = await createFeedBackController(
      comment,
      raiting,
      post_at,
      user_id,
      instructor_id
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Este handler nos permite manejar la busqueda de feedBacks dependiendo si nos envian un requerimiento para realizar una busqueda por nombre o no.
const getFeedBacksHandler = async (req, res) => {
  const { fullname } = req.query;
  try {
    const response = fullname
      ? await getFeedBackByNameController(fullname)
      : await getFeedBacksController();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Con este handler manejamos la modificación de un feedback.
const putFeedBackHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const response = await putFeedBackController(id, status)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createFeedBackHandler,
  getFeedBacksHandler,
  putFeedBackHandler,

};
