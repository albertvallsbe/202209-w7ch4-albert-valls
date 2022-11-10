import "../../../loadEnvironment.js";
import type { Request, Response, NextFunction } from "express";
import debugConfig from "debug";
import type CustomError from "../../../CustomError/CustomError";
import chalk from "chalk";
import { ValidationError } from "express-validation";

const debug = debugConfig("items:server:middleware:errors");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    debug(
      chalk.red(
        (error as ValidationError).details.body
          .map((error) => error.message)
          .join("\n")
      )
    );
    error.publicMessage =
      "The details you provided don't meet the requirements";
  }

  const { message, publicMessage, statusCode } = error;
  debug(chalk.red(message));
  const responseMessage = publicMessage || "There was an error on the server";
  const responseStatus = statusCode ?? 500;

  res.status(responseStatus).json({ error: responseMessage });
};

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "Unknown Endpoint" });
};
