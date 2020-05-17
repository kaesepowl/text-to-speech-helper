const getProcessedAudio = require("./getProcessedAudio");
const fastify = require("fastify")();
const fastifyPlugin = require("fastify-plugin");

const sendFileSpy = jest.fn();

fastify.register(
  fastifyPlugin((fastify, opts, next) => {
    fastify.decorateReply("sendFile", function (...args) {
      sendFileSpy(...args);
      this.send("AUDIO_FILE");
    });
    next();
  })
);
fastify.register(getProcessedAudio);

describe("retrieve audio file", () => {
  let res;
  beforeAll(async () => {
    res = await fastify.inject({
      method: "GET",
      path: "/processed/1234/audio",
    });
  });
  it("should invoke sendFile with audio path", () => {
    expect(sendFileSpy).toHaveBeenCalledWith("audio/1234.mp3");
  });
  it("should response with code 200", () => {
    expect(res.statusCode).toBe(200);
  });
  it("should return an audio file", () => {
    expect(res.payload).toBe("AUDIO_FILE");
  });
});
