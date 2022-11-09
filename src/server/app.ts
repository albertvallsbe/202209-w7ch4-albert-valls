import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors.js";
import usersRouter from "./routers/usersRouter.js";
import usersRoutes from "./routers/usersRoutes.js";

const { users } = usersRoutes;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(users, usersRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
