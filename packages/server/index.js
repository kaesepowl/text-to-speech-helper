const { server } = require("./src/server");
const { starter } = require("./src/starter");

try {
  const port = 8080;
  starter(server, port);

  console.log(`Server startet on port [${port}]`);
} catch (e) {
  console.error(e);
  process.exit(-1);
}
