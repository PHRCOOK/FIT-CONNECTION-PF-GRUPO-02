const { ClientInfo, User } = require('../db');

// Este controller nos permite crear información de un usuario.
const createClientInfoController = async (user_id, address, phone, dni, birth_date) => {
    try {
        // Buscamos al usuario por su id.
        const user = await User.findByPk(user_id);
        
        if (!user) {
            throw new Error('User not found');
        }
        const infoClient = await ClientInfo.create({address, phone, dni, birth_date})   

        await user.setClientInfo(infoClient)

        return { 
            message: 'Información creada con exito',
            user: user.fullname,
            infoClient: infoClient
        } 
    } catch (error) {
        throw new Error(`Error al agregar la información ${error.message}`)
    }
}

// En este controller nos permite actulazar la información de un usuario.
const updateClientInfoController = async (user_id, newData) => {
    try {
        const user = await User.findByPk(user_id);
        
        if (!user) {
            throw new Error('User not found');
        }

        const newInfoClient = await ClientInfo.findOne({
            where: {
                user_id: user_id,
            }

        })
        await newInfoClient.update(newData);
        
        return { 
            message: "Información del usuario actualizada exitosamente.",
            user: user.fullname,
            infoClient: newInfoClient,
        };

    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);        
    }
}

// Este controller permite la busqueda de la información de un usuario.
const getClientInfoController = async (user_id) => {
    try {
        const user = await User.findByPk(user_id);

        const clientInfo = await ClientInfo.findOne({
            where: {
                user_id: user_id,
            }
        })
        
        if (!clientInfo) {
            throw new Error('Información de usuario no encontrada.')
        }

        return { user: user.fullname, clientInfo: clientInfo };

    } catch (error) {
        throw new Error(`Error al buscar la información: ${error.message}`);                
    }
}

module.exports = {
    createClientInfoController,
    updateClientInfoController,
    getClientInfoController,

}