const { Gym } = require("../db");

const getGymController = async () => {
  console.log("XXXXXXXX");
  try {
    //Hacemos la consulta para traer la data de la entidad gym
    const gym = await Gym.findAll();
    //si gym.length es igual a 0 emitimos error
    if (gym.length === 0) {
      throw new Error("No existen registro del gym");
    }
    console.log(gym[0]);
    //retornamos la data guardada en gym
    return gym;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
const postGymController = async (name, address, phone, status, nit, map) => {
  try {
    //Verificamos si hay un registro ya del gym
    const response = await Gym.findAll();
    //si la longitud de response es distinto a "0" emitimos un error
    if (response.length === 1) {
      throw new Error("Solo puede haber un solo gym registrado");
    }
    //verificamos que no haya un campo vacio
    if (!name || !address || !phone || !nit || !map) {
      throw new Error("No puede haber campos vacíos");
    }
    //posteamos la data en la entidad
    await Gym.create({ name, address, phone, status, nit, map });
    //retornamos el resultado
    return "Añadido satisfactoriamente";
  } catch (error) {
    throw new Error(error.message);
  }
};

const putGymController = async (id, data) => {
  try {
    const [putRowCount, putGym] = await Gym.update(data, {
      where: {
        id: `${id}`,
      },
    });
    if (putRowCount === 0) {
      throw new Error("Gym no encontrado");
    }
    return { message: "Datos del gym actualizado" };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getGymController,
  postGymController,
  putGymController,
};
