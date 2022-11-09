import { Router } from "express";
import { loginUser } from "../controllers/usersControllers.js";

import usersRoutes from "./usersRoutes.js";

const { login } = usersRoutes;

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.post(login, loginUser);

export default usersRouter;
