import type { Request, NextFunction } from "express";
import { authErrors } from "../../CustomError/errors";
import { auth } from "./auth";

const req: Partial<Request> = {};

const next = jest.fn();

describe("Given the auth middleware", () => {
  describe("When it receives a request with no Authorization header and a next function", () => {
    test("Then it should invoke next with an error with status code 401 and public message 'No token provided'", () => {
      const expectedError = authErrors.noTokenProvided;

      req.header = jest.fn().mockReturnValueOnce(undefined);

      auth(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with Authorization header '1234'", () => {
    test("Then it should invoke next with an error with status code 401 and public message 'Bad Token'", () => {
      const expectedError = authErrors.missingBearer;

      req.header = jest.fn().mockReturnValueOnce("1234");

      auth(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
