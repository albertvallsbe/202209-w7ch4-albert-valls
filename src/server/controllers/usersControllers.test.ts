import bcrypt from "bcryptjs";
import type { Response, Request, NextFunction } from "express";
import User from "../../database/models/User";
import { loginUser } from "./usersControllers";
import { loginErrors } from "../../CustomError/errors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

beforeEach(() => jest.clearAllMocks());

const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const token = jwt.sign({}, "testsecret");

describe("Given a loginUser controller", () => {
  describe("When it receives a request with username 'ben' and password '1234' in the body and a next function", () => {
    test("Then it should call next with a CustomError with publicMessage 'Invalid username or password'", async () => {
      const user = {
        username: "ben",
        password: "1234",
      };

      req.body = user;

      User.findOne = jest.fn().mockResolvedValueOnce(null);

      await loginUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(loginErrors.userNotFound);
    });
  });

  describe("When it receives a request with username 'admin' and password 'password' in the body and a next function", () => {
    test("Then it should call next with a CustomError with publicMessage 'Invalid username or password'", async () => {
      const user = {
        username: "admin",
        password: "password",
      };
      const userId = new mongoose.Types.ObjectId();
      req.body = user;
      User.findOne = jest.fn().mockResolvedValueOnce({ ...user, _id: userId });
      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(loginErrors.incorrectPassword);
    });
  });

  describe("When it receives a request with username 'admin' and password 'admin' in the body and a response", () => {
    test("Then it should call response's status method with 200 and json with a token", async () => {
      const user = {
        username: "admin",
        password: "admin",
      };
      const userId = new mongoose.Types.ObjectId();
      const expectedStatus = 200;
      req.body = user;
      User.findOne = jest.fn().mockResolvedValueOnce({ ...user, _id: userId });
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      jwt.sign = jest.fn().mockReturnValueOnce(token);

      await loginUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request, response and next function and bcrypt rejects", () => {
    test("Then next should be called", async () => {
      const error = new Error();
      const user = {
        username: "admin",
        password: "admin",
      };
      const userId = new mongoose.Types.ObjectId();
      req.body = user;
      User.findOne = jest.fn().mockResolvedValueOnce({ ...user, _id: userId });
      bcrypt.compare = jest.fn().mockRejectedValueOnce(error);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
