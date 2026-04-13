import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const requireFields = (fields: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === "");

    if (missing.length > 0) {
      throw new ApiError(400, `Missing required fields: ${missing.join(", ")}`);
    }

    next();
  };
};
