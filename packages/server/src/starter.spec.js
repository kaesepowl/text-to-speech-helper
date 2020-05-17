const { starter } = require('./starter');

describe('starter', () => {
  it('should invoke listen method of server', async () => {
    const PORT = 8080;
    const server = {
      listen: jest.fn(),
    };
    await starter(server, 8080);
    expect(server.listen).toHaveBeenCalledWith(PORT);
  });
});
