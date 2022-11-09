import "../../loadEnvironment.js";
import type { Request, Response, NextFunction } from "express";
import debugConfig from "debug";
import type CustomError from "../../CustomError/CustomError";
import chalk from "chalk";

const debug = debugConfig("items:server:middleware:errors");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const { message, publicMessage, statusCode } = error;
  debug(chalk.red(message));
  const responseMessage = publicMessage || "There was an error on the server";
  const responseStatus = statusCode ?? 500;

  res.status(responseStatus).json({ error: responseMessage });
};
