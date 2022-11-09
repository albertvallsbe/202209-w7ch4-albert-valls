import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { loginErrors } from "../../CustomError/errors.js";
import User from "../../database/models/User.js";
import type { LoginUserBody } from "./types.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as LoginUserBody;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      next(loginErrors.userNotFound);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      next(loginErrors.incorrectPassword);
      return;
    }
  } catch (error: unknown) {
    next(error);
  }

  res.status(200).json();
};
