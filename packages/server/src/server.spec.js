const { server } = require("./server");

const getProcessedList = require("./routes/getProcessedList");
const addToProcessedList = require("./routes/addToProcessedList");

jest.mock("./routes/getProcessedList", () => jest.fn(async () => {}));
jest.mock("./routes/addToProcessedList", () => jest.fn(async () => {}));

describe("server test", () => {
  afterAll(() => {
    server.close();
  });
  describe("init", () => {
    it("should export fastify server", () => {
      expect(server).toBeDefined();
    });
    it("should responds with 200 on /", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/",
      });
      expect(response.statusCode).toBe(200);
      expect(response.payload).toBe(JSON.stringify({ status: "ok" }));
    });
  });

  describe("routes", () => {
    it("should registered [GET] /processed", () => {
      expect(getProcessedList).toHaveBeenCalled();
    });
    it("should registered [POST] /processed", () => {
      expect(addToProcessedList).toHaveBeenCalled();
    });
  });
});
