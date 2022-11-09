import CustomError from "./CustomError";

describe("Given the class CustomError", () => {
  describe("When it is instantiated with the message 'General Error', statusCode 500 and public message 'There was an error on the server'", () => {
    test("Then it should return an object with those properties and values", () => {
      const expectedError = {
        message: "General Error",
        statusCode: 500,
        publicMessage: "There was an error on the server",
      };

      const customError = new CustomError(
        expectedError.message,
        expectedError.statusCode,
        expectedError.publicMessage
      );

      expect(customError).toHaveProperty("message", expectedError.message);
      expect(customError).toHaveProperty(
        "statusCode",
        expectedError.statusCode
      );
      expect(customError).toHaveProperty(
        "publicMessage",
        expectedError.publicMessage
      );
    });
  });
});
