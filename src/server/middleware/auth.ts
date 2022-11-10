import type { NextFunction, Request, Response } from "express";
import { authErrors } from "../../CustomError/errors";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      next(authErrors.noTokenProvided);
    }
  } catch {}
};
