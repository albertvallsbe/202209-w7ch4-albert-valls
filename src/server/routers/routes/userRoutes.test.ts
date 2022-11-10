import "../../../loadEnvironment";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDb from "../../../database/connectDb";
import User from "../../../database/models/User";
import request from "supertest";
import app from "../../app";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDb(server.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the userRouter router with POST method and the endpoint /login", () => {
  describe("When it receives a request with a username: 'mario'  and password '1234' on the body ", () => {
    test("Then it should call the response statuscode 200", async () => {
      const expectedStatus = 200;
      const user = await User.create({
        username: "albert",
        email: "asfdasf@agsfdh",
        password: "patatatas",
      });

      const requestBody = {
        username: user.username,
        password: await bcrypt.hash("patatatas", 10),
      };

      const res = await request(app)
        .post("/users/login")
        .send(requestBody)
        .expect(expectedStatus);

      expect(res.body).toHaveProperty("token");
    });
  });
});
