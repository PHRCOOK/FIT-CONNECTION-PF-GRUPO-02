const server = require('./src/server.js');
const { conection } = require('./src/db.js');

// Syncing all the models at once.
conection.sync({ force: true  }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
