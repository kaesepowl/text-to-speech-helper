const { dataPath } = require("../../config");

module.exports = async (fastify) => {
  fastify.get("/processed/:id/audio", async ({ params }, reply) => {
    const { id } = params;
    reply.sendFile(`audio/${id}.mp3`);
  });
};
