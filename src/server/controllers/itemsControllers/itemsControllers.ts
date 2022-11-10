import type { NextFunction, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Item from "../../../database/models/Item";
import type { CustomRequest } from "../usersControllers/types";

export const getUserItems = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  try {
    const items = await Item.find({ owner: userId });

    res.status(200).json({ items });
  } catch (error: unknown) {
    next(
      new CustomError(
        (error as Error).message,
        500,
        "There was a problem when trying to get your list"
      )
    );
  }
};
