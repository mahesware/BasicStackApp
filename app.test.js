const request = require("supertest");
const app = require("../app");
it("should push an element", async () => {
    const res = await request(app).post("/push").send({ value: "A" });
    expect(res.status).toBe(200);
    expect(res.body.stack).toEqual(["A"]);
  });
 it("should not push when stack is full", async () => {
    const res = await request(app).post("/push").send({ value: "C" });
    expect(res.status).toBe(400);
    expect(res.text).toBe("Stack overflow: Maxsize reached!");
  });
it("should not pop from empty stack", async () => {
    const res = await request(app).post("/pop");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Stack is empty");
  });
 it("should return empty stack initially", async () => {
    const res = await request(app).get("/stack");
    expect(res.status).toBe(200);
    expect(res.body.stack).toEqual([]);
  });
