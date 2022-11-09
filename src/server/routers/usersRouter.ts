import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../controllers/usersControllers.js";
import userLoginSchema from "../schemas/userLoginSchema.js";

import usersRoutes from "./usersRoutes.js";

const { login } = usersRoutes;

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.post(
  login,
  validate(userLoginSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
