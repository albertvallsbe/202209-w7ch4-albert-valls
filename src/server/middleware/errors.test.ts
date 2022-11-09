import type { Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalError } from "./errors";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the middleware generalError", () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a CustomError with message 'Incorrect password', statusCode: 401, publicMessage 'Wrong username or password'", () => {
    test("Then it should invoke the received response's status method with 401 and json with the public message", () => {
      const message = "Incorrect password";
      const statusCode = 401;
      const publicMessage = "Wrong username or password";

      const incorrectPasswordError = new CustomError(
        message,
        statusCode,
        publicMessage
      );

      generalError(incorrectPasswordError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });

  describe("When it receives an Error with message 'General Error'", () => {
    test("Then it should call the received response method status with 500 and json with 'There was an error on the server'", () => {
      const errorGeneral = new Error("General Error");
      const statusCode = 500;
      const publicMessage = "There was an error on the server";

      generalError(errorGeneral as CustomError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});
