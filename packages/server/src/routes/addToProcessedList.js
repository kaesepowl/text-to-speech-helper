const AWS = require("aws-sdk");
const { promisify } = require("util");
const { writeFile } = require("fs");
const md5 = require("md5");

const { dataPath } = require("../../config");

const pWriteFile = promisify(writeFile);

module.exports = async (fastify) => {
  fastify.post("/processed", async (request, reply) => {
    try {
      const { text, accessKeyId, secretAccessKey } = request.body;
      const Polly = new AWS.Polly({
        accessKeyId,
        secretAccessKey,
        signatureVersion: "v4",
        region: "eu-central-1",
      });

      const { AudioStream } = await Polly.synthesizeSpeech({
        Text: `<speak>${text}</speak>`,
        TextType: "ssml",
        OutputFormat: "mp3",
        VoiceId: "Hans",
        LanguageCode: "de-DE",
      }).promise();

      const newId = md5(text);

      await Promise.all([
        pWriteFile(`${dataPath}/audio/${newId}.mp3`, AudioStream),
        pWriteFile(`${dataPath}/text/${newId}`, text),
      ]);

      reply.code(201);
      return { id: newId };
    } catch (e) {
      console.error(e);
      return null;
    }
  });
};
