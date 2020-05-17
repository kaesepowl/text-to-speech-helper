const { readdir, readFile } = require('fs');

const getProcessedList = require('./getProcessedList');
const fastify = require('fastify')();

jest.mock('fs', () => ({
  readdir: jest.fn(),
  readFile: jest.fn(),
}));

jest.mock('../../config', () => ({
  dataPath: '/the/data/path',
}));

fastify.register(getProcessedList);

describe('empty list', () => {
  let res;
  beforeAll(async () => {
    readdir.mockImplementationOnce((path, cb) => cb(null, []));
    res = await fastify.inject({
      method: 'GET',
      path: '/processed',
    });
  });
  it('should invoke readdir with path from config', () => {
    expect(readdir).toHaveBeenCalledWith(
      '/the/data/path/text',
      expect.any(Function)
    );
  });
  it('should response with code 200', () => {
    expect(res.statusCode).toBe(200);
  });
  it('should return an empty list', () => {
    expect(res.payload).toBe(JSON.stringify([]));
  });
});

describe('full list', () => {
  let res;
  const ids = [
    // valid
    'abcd0123'.repeat(4),
    // valid
    'ef456789'.repeat(4),
    // invalid
    'xyz?6789'.repeat(4),
  ];
  beforeAll(async () => {
    const fileContent = {};
    ids.forEach((id, i) => {
      fileContent[`/the/data/path/text/${id}`] = `THE_${id}_TEXT`;
    });

    readdir.mockImplementation((path, cb) => cb(null, ['garbage.exe', ...ids]));
    readFile.mockImplementation((path, cb) => cb(null, fileContent[path]));

    res = await fastify.inject({
      method: 'GET',
      path: '/processed',
    });
  });
  it('should invoke readdir with path from config', () => {
    expect(readdir).toHaveBeenCalledWith(
      '/the/data/path/text',
      expect.any(Function)
    );
  });
  it('should response with code 200', () => {
    expect(res.statusCode).toBe(200);
  });
  it('should return a list with 2 items', () => {
    expect(JSON.parse(res.payload)).toHaveLength(2);
  });
  it('should contain first and second text', () => {
    expect(JSON.parse(res.payload)).toEqual([
      expect.objectContaining({
        text: `THE_${ids[0]}_TEXT`,
      }),
      expect.objectContaining({
        text: `THE_${ids[1]}_TEXT`,
      }),
    ]);
  });
});
