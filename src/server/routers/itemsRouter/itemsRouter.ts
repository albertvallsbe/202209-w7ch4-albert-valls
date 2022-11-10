import { Router } from "express";
import {
  createItem,
  getUserItems,
} from "../../controllers/itemsControllers/itemsControllers.js";
import itemsRoutes from "../routes/itemsRoutes.js";

const { list, newitem } = itemsRoutes;

// eslint-disable-next-line new-cap
const itemsRouter = Router();

itemsRouter.get(list, getUserItems);
itemsRouter.post(newitem, createItem);

export default itemsRouter;
