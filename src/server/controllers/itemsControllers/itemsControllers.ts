import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import type { ItemStructure } from "../../../database/models/Item.js";
import Item from "../../../database/models/Item.js";
import type { CustomRequest } from "../../../types.js";

export const getUserItems = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await Item.find({});

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

export const createItem = async (req: Request, res: Response) => {
  const { name } = req.body as ItemStructure;

  const createdItem = await Item.create({
    name,
  });

  res.status(201).json({ createdItem });
};
