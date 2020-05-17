const { readdir, readFile } = require('fs');
const { promisify } = require('util');

const { dataPath } = require('../../config');

const pReaddir = promisify(readdir);
const pReadFile = promisify(readFile);

const TEST_FILE_REGEX = /^[a-f0-9]{32}$/;

module.exports = async (fastify) => {
  fastify.get('/processed', async () => {
    const dirContent = await pReaddir(`${dataPath}/text`);
    const cleanContent = dirContent.filter((f) => TEST_FILE_REGEX.test(f));
    const fileContent = await Promise.all(
      cleanContent.map((f) =>
        pReadFile(`${dataPath}/text/${f}`).then((c) => c.toString())
      )
    );

    return cleanContent.map((id, i) => ({ id, text: fileContent[i] }));
  });
};
