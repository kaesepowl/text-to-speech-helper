const fastify = require('fastify')();
const AWS = require('aws-sdk');
const AwsMock = require('aws-sdk-mock');
const { writeFile } = require('fs');

const addToProcessedList = require('./addToProcessedList');

AwsMock.setSDKInstance(AWS);
fastify.register(addToProcessedList);

jest.mock('md5', () => () => 'MD5_HASH');

jest.mock('fs', () => ({
  writeFile: jest.fn(),
}));

jest.mock('../../config', () => ({
  dataPath: '/the/data/path',
}));

describe('add new text to speech', () => {
  let res, spy;
  beforeAll(async () => {
    spy = jest.fn((params, callback) => {
      callback(null, {
        AudioStream: new Buffer(''),
      });
    });
    AwsMock.restore();
    AwsMock.mock('Polly', 'synthesizeSpeech', spy);

    writeFile.mockImplementation((path, stream, cb) => cb(null));

    process.env = {
      ...process.env,
      POLLY_ACCESS_KEY_ID: 'ACCESS_KEY_ID',
      POLLY_SECRET_ACCESS_KEY: 'SECRET_ACCESS_KEY',
    };

    res = await fastify.inject({
      method: 'POST',
      path: '/processed',
      payload: {
        text: 'THE_NEW_TEXT',
      },
    });
  });

  it('should invoked polly accessKeyId and secretAccessKey from request', () => {
    expect(AWS.Polly.args[0][0]).toEqual(
      expect.objectContaining({
        accessKeyId: 'ACCESS_KEY_ID',
        secretAccessKey: 'SECRET_ACCESS_KEY',
      })
    );
  });

  it('should invoked polly with eu-central-1 region', () => {
    expect(AWS.Polly.args[0][0]).toEqual(
      expect.objectContaining({
        region: 'eu-central-1',
      })
    );
  });

  it('should invoke polly with text from request', () => {
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        Text: '<speak>THE_NEW_TEXT</speak>',
      }),
      expect.any(Function)
    );
  });

  it('should write audioStream to file', () => {
    expect(writeFile).toHaveBeenCalledWith(
      '/the/data/path/audio/MD5_HASH.mp3',
      expect.any(Buffer),
      expect.any(Function)
    );
  });

  it('should write text to file', () => {
    expect(writeFile).toHaveBeenCalledWith(
      '/the/data/path/text/MD5_HASH',
      'THE_NEW_TEXT',
      expect.any(Function)
    );
  });

  it('should return 201', () => {
    expect(res.statusCode).toBe(201);
  });
  it('should return new id', () => {
    expect(JSON.parse(res.payload)).toEqual({
      id: 'MD5_HASH',
    });
  });
});
