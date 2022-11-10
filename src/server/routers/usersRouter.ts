import { Router } from "express";
import { validate } from "express-validation";
import {
  loginUser,
  registerUser,
} from "../controllers/usersControllers/usersControllers.js";
import userLoginSchema from "../schemas/userLoginSchema.js";
import userRegisterSchema from "../schemas/userRegisterSchema.js";

import usersRoutes from "./usersRoutes.js";

const { login, register } = usersRoutes;

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.post(
  login,
  validate(userLoginSchema, {}, { abortEarly: false }),
  loginUser
);

usersRouter.post(
  register,
  validate(userRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
