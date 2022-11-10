import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { loginErrors } from "../../../CustomError/errors.js";
import User from "../../../database/models/User.js";
import { jwtSecret } from "../../../loadEnvironment.js";
import CustomError from "../../../CustomError/CustomError.js";
import type {
  LoginUserBody,
  UserTokenPayload,
  RegisterUserBody,
} from "../../../types.js";

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

    const tokenPayload: UserTokenPayload = {
      username,
      id: user._id.toString(),
    };

    const token = jwt.sign(tokenPayload, jwtSecret, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterUserBody;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ user: { username, email, id: user._id } });
  } catch (error: unknown) {
    if ((error as Error).message.includes("duplicate")) {
      next(
        new CustomError(
          (error as Error).message,
          409,
          "User already registered"
        )
      );
      return;
    }

    next(
      new CustomError((error as Error).message, 500, "Couldn't create user")
    );
  }
};
