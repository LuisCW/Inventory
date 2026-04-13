import { NextFunction, Request, Response } from "express";
import { IUserRole } from "../models/User";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    role: IUserRole;
  };
};

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Missing or invalid token");
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const payload = verifyToken(token);
  (req as AuthenticatedRequest).user = payload;
  next();
};

export const authorize = (...roles: IUserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(authReq.user.role)) {
      throw new ApiError(403, "Forbidden");
    }

    next();
  };
};
