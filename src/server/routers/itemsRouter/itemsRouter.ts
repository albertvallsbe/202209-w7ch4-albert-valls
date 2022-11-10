import { Router } from "express";
import { getUserItems } from "../../controllers/itemsControllers/itemsControllers.js";
import { auth } from "../../middleware/auth/auth.js";
import itemsRoutes from "../routes/itemsRoutes.js";

const { list } = itemsRoutes;

// eslint-disable-next-line new-cap
const itemsRouter = Router();

itemsRouter.get(list, auth, getUserItems);

export default itemsRouter;
