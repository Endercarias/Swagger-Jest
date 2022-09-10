const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const mongoose = require("mongoose")
const { UsersMoldel } = require("../models");
const { StorageMoldel } = require("../models");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  const user = UsersMoldel.findOne({email:"test@test.com"});
  JWT_TOKEN = await tokenSign(user);
});

test("should uplaod file", async () => {
  const res = await request(app)
    .post("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .attach("myfile", filePath);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.url");
});

test("should create a return all", async () => {
  const res = await request(app)
    .get("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  expect(body).toHaveProperty("data");
});
/**
 * [GET STORAGE ITEM] test get detail item
 */
test("debe retornar todo el detalle del item", async () => {
  const { _id } = await StorageMoldel.findOne();
  id = _id.toString();

  const res = await request(app)
    .get(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});


afterAll(()=>{
    mongoose.connection.close()
})