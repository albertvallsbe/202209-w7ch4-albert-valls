import CustomError from "./CustomError.js";

export const loginErrors = {
  userNotFound: new CustomError(
    "Incorrect username",
    401,
    "Incorrect username or password"
  ),
};
