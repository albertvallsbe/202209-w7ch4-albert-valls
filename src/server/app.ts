import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "./middleware/errors/errors.js";
import itemsRoutes from "./routers/routes/itemsRoutes.js";
import itemsRouter from "./routers/itemsRouter/itemsRouter.js";

const { items } = itemsRoutes;
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(items, itemsRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
