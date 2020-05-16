const server = require("fastify")();

server.get("/", async () => {
  return {
    status: "ok",
  };
});

server.register(require("./routes/getProcessedList"));
server.register(require("./routes/getProcessedAudio"));
server.register(require("./routes/addToProcessedList"));

module.exports = { server };
