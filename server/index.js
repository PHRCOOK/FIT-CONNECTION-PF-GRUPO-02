const server = require("./src/server.js");
const { conn } = require("./src/db.js");
const PORT = process.env;

conn
  .sync({ force: false }) // Se deja en "false" para realizar pruebas.
  .then(() => {
    server.listen(PORT, () => {
      console.log(`listening at ${PORT}`);
    });
  })
  .catch((error) => console.log(error)); // Se agrega para que muestre cualquier error de forma mas explicita..
