import "./loadEnvironment.js";
import debugConfig from "debug";
import app from "./server/app.js";
import startServer from "./server/startServer.js";
import { port, mongoDbUrl } from "./loadEnvironment.js";
import chalk from "chalk";
import connectDb from "./database/connectDb.js";
import type { Error } from "mongoose";
import { mongo } from "mongoose";

const debug = debugConfig("items:root");

// eslint-disable-next-line @typescript-eslint/naming-convention
const { MongoServerError } = mongo;

try {
  await startServer(app, +port);
  debug(chalk.green(`Server is running on http://localhost:${port}`));
  await connectDb(mongoDbUrl);
  debug(chalk.green(`Connected to database`));
} catch (error: unknown) {
  if (error instanceof MongoServerError) {
    debug(
      chalk.red(`Error connecting to the database ${(error as Error).message}`)
    );
  } else {
    debug(chalk.red(`Error starting the server ${(error as Error).message}`));
  }
}
