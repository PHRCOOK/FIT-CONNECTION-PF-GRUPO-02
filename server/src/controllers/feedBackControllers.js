const { FeedBack, User, Instructor } = require("../db");

// Este controller nos permite crear un comentario para calificar a un instructor vinculadolo por su id y lo asocia al usuario que realice el comentario.
const createFeedBackController = async (
  comment,
  raiting,
  post_at,
  user_id,
  instructor_id
) => {
  try {
    // Buscamos el usuario y el instructor con los IDs proporcionados.
    const user = await User.findByPk(user_id);
    const instructor = await Instructor.findByPk(instructor_id);

    if (!user) {
      throw new Error("User not found.");
    } else if (!instructor) {
      throw new Error("Instructor not found.");
    }

    // Creamos el nuevo comentario.
    const newFeedBack = await FeedBack.create({ comment, raiting, post_at });

    // Establecemos las relaciones entre los modelos.
    await user.addFeedBack(newFeedBack);
    await instructor.addFeedBack(newFeedBack);

    // Establecemos las relaciones inversas para terminar la vincualción.
    await newFeedBack.setUser(user);
    await newFeedBack.setInstructor(instructor);

    return { message: "Comment created successfully." };
  } catch (error) {
    throw new Error(`Error creating comment: ${error.message}`);
  }
};

// Este controller nos permite realizar la busqueda de todos los feedBack que se han realizado.
const getFeedBacksController = async () => {
  try {
    const feedBacks = await FeedBack.findAll({
      include:[ 
        { model: Instructor, as: 'Instructor', attributes: ['fullname'] },
        { model: User, as: 'User', attributes: ['fullname'] }
      ],
    });
    if (!feedBacks) {
      throw new Error('No comment found.')
    }
    return {Items: feedBacks};
  } catch (error) {
    throw new Error(error.message)
  }
}


module.exports = {
  createFeedBackController,
  getFeedBacksController,
};
