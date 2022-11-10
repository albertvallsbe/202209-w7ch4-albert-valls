import { Router } from "express";
import { getUserItems } from "../../controllers/itemsControllers/itemsControllers";
import { auth } from "../../middleware/auth/auth";
import itemsRoutes from "../routes/itemsRoutes";

const { list } = itemsRoutes;

// eslint-disable-next-line new-cap
const itemsRouter = Router();

itemsRouter.get(list, auth, getUserItems);

export default itemsRouter;
