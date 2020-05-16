const path = require("path");

const { dataPath } = require("./config");

const { server } = require("./src/server");
const { starter } = require("./src/starter");

try {
  const port = 8080;

  server.register(require("fastify-cors"), {
    origin: ["http://localhost:3000"],
  });

  server.register(require("fastify-static"), {
    root: path.join(dataPath),
  });

  starter(server, port);

  console.log(`Server startet on port [${port}]`);
} catch (e) {
  console.error(e);
  process.exit(-1);
}
