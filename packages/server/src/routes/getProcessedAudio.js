const { dataPath } = require("../../config");

module.exports = async (fastify) => {
  fastify.get("/processed/:id/audio", async (request, reply) => {
    reply.sendFile("audio/9a72219771a8c9b33b112d057d860544.mp3");
  });
};
