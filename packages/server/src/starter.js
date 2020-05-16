const starter = async (server, port) => {
  try {
    await server.listen(port);
  } catch (e) {}
};

module.exports = { starter };
