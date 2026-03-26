import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import { jest } from "@jest/globals";

let mongoServer;
jest.setTimeout(30000);
beforeAll(async () => {
mongoServer = await MongoMemoryServer.create({
  binary: {
    version: "6.0.6"
  }
});
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

export default app;    