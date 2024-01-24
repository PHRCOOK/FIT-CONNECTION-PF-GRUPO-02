const server = require('./src/server.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
      console.log('listening at 3001');
    });
}).catch((error) => console.log(error)); // Se agrega para que muestre cualquier error de forma mas explicita.

