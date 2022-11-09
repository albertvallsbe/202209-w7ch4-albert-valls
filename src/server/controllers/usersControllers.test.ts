import bcrypt from "bcryptjs";
import type { Response, Request, NextFunction } from "express";
import User from "../../database/models/User";
import { loginUser, registerUser } from "./usersControllers";
import { loginErrors } from "../../CustomError/errors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import CustomError from "../../CustomError/CustomError";

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

  describe("When it receives a request, response and next function and password comparing fails", () => {
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

describe("Given a registerUsers controller", () => {
  describe("When it receives a request with username 'admin', password: 'admin123' and email 'admin@items.com' and a next function", () => {
    test("Then it should call next with status 409 and public message 'User already registered'", async () => {
      const user = {
        username: "admin",
        password: "admin123",
        email: "admin@items.com",
      };
      req.body = user;
      const error = new CustomError(
        "duplicate key",
        409,
        "User already registered"
      );
      bcrypt.hash = jest.fn().mockResolvedValueOnce(user.password);
      User.create = jest.fn().mockRejectedValueOnce(error);

      await registerUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request with username 'newuser', password '12345abc' and email 'newuser@gmail.com' in the body and a response", () => {
    test("Then it should call the response's status method with 201 and json method with the new user's details", async () => {
      const user = {
        username: "newuser",
        password: "12345abc",
        email: "newuser@gmail.com",
      };
      const expectedStatus = 201;
      req.body = user;
      const userId = new mongoose.Types.ObjectId();
      bcrypt.hash = jest.fn().mockResolvedValueOnce(user.password);
      User.create = jest.fn().mockResolvedValueOnce({ ...user, _id: userId });

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({
        user: { username: user.username, email: user.email, id: userId },
      });
    });
  });

  describe("When it receives a request and a next function and password hashing fails", () => {
    test("Then it should invoke next with an error with status 500 and public message 'Couldn't create user'", async () => {
      const user = {
        username: "newuser",
        password: "12345abc",
        email: "newuser@gmail.com",
      };
      const statusCode = 500;
      const publicMessage = "Couldn't create user";
      const error = new CustomError(
        "Couldn't hash password",
        statusCode,
        publicMessage
      );
      req.body = user;

      bcrypt.hash = jest.fn().mockRejectedValueOnce(error);

      await registerUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
