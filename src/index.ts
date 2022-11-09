import "./loadEnvironment.js";
import debugConfig from "debug";
import app from "./server/app.js";
import startServer from "./server/startServer.js";
import { port } from "./loadEnvironment.js";
import chalk from "chalk";

const debug = debugConfig("items:root");

try {
  await startServer(app, +port);
  debug(chalk.green(`Server is running on http://localhost:${port}`));
} catch (error: unknown) {
  debug(chalk.red(`Error starting the server ${(error as Error).message}`));
}
