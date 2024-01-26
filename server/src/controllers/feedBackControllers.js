const { FeedBack, User, Instructor } = require("../db");


// Este controller nos permite crear un comentario para calificar a un instructor vinculadolo por su id y lo asocia al usuario que realice el comentario.
const createFeedBackController = async (comment, raiting, post_at, user_id, instructor_id) => {
    try {
         // Buscamos el usuario y el instructor con los IDs proporcionados.
         const user = await User.findByPk(user_id);
         const instructor = await Instructor.findByPk(instructor_id);

        if (!user) {
            throw new Error("Usuario no encontrado.");
        } else if(!instructor) {
            throw new Error("Instructor no encontrado.");
        };

        // Creamos el nuevo comentario.
        const newFeedBack = await FeedBack.create({ comment, raiting, post_at});

        // Establecemos las relaciones entre los modelos.
        await user.addFeedBack(newFeedBack);
        await instructor.addFeedBack(newFeedBack);

        // Establecemos las relaciones inversas para terminar la vincualción.
        await newFeedBack.setUser(user);
        await newFeedBack.setInstructor(instructor);
        
        return newFeedBack;
    } catch (error) {
        throw new Error(`Error al crear el comentario: ${error.message}`);
    };
};


module.exports = {
    createFeedBackController,

};