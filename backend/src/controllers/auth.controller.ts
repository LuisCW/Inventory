import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { signToken } from "../utils/jwt";
import { isStrongPassword, isValidEmail } from "../utils/validators";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role = "USER" } = req.body;

  if (!email || !password || !name) {
    throw new ApiError(400, "email, password and name are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  if (!isStrongPassword(password)) {
    throw new ApiError(400, "Password must be at least 8 chars and include uppercase, lowercase, number and symbol");
  }

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new ApiError(409, "User already exists");
  }

  const user = await UserModel.create({ email, password, name, role, active: true });
  const token = signToken({ id: user.id, role: user.role });

  res.status(201).json({
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email and password are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user || !user.active) {
    throw new ApiError(401, "Invalid credentials");
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken({ id: user.id, role: user.role });

  res.status(200).json({
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    },
  });
});
