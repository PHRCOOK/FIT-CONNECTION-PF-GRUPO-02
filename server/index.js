const server = require("./src/server.js");
const { conn } = require("./src/db.js");

conn
<<<<<<< HEAD
  .sync({ force: false })
=======
  .sync({ force: false }) // Se deja en "false" para realizar pruebas.
>>>>>>> 6d9e894bb91eb8bef73fb63f7e0b350ad3f62df6
  .then(() => {
    server.listen(3001, () => {
      console.log("listening at 3001");
    });
  })
  .catch((error) => console.log(error)); // Se agrega para que muestre cualquier error de forma mas explicita..