import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(unknownEndpoint);
app.use(generalError);

export default app;
