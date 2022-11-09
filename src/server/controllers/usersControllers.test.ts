import type { Request, NextFunction } from "express";
import User from "../../database/models/User";
import { loginUser } from "./usersControllers";
import { loginErrors } from "../../CustomError/errors";

const req: Partial<Request> = {};

const next = jest.fn();

describe("Given a loginUser controller", () => {
  describe("When it receives a request with username 'ben' and password '1234' in the body and a next function", () => {
    test("Then it should call next with a CustomError with publicMessage 'Invalid username or password'", async () => {
      const user = {
        username: "ben",
        password: "1234",
      };

      req.body = user;

      User.findOne = jest.fn().mockReturnValue(null);

      await loginUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(loginErrors.userNotFound);
    });
  });
});
