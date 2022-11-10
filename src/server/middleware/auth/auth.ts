import type { NextFunction, Response } from "express";
import { authErrors } from "../../../CustomError/errors";
import { jwtSecret } from "../../../loadEnvironment";
import type {
  CustomRequest,
  UserTokenPayload,
} from "../../controllers/usersControllers/types";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      next(authErrors.noTokenProvided);
      return;
    }

    if (!authHeader.startsWith("Bearer")) {
      next(authErrors.missingBearer);
    }

    const token = authHeader.replace(/^Bearer\s*/, "");

    const user: UserTokenPayload = jwt.verify(
      token,
      jwtSecret
    ) as UserTokenPayload;

    req.userId = user.id;

    next();
  } catch (error: unknown) {
    next(new CustomError((error as Error).message, 401, "Invalid token"));
  }
};
