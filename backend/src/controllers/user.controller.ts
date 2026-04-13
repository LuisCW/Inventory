import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { UserModel } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { isStrongPassword, isValidEmail } from "../utils/validators";

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const offset = Number(req.query.offset || 0);
  const limit = Number(req.query.limit || 10);
  const active = req.query.active as string | undefined;

  const query: FilterQuery<any> = {};
  if (active === "true" || active === "false") {
    query.active = active === "true";
  }

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).sort({ creationAt: -1 }).skip(offset).limit(limit),
  ]);

  res.status(200).json({ data: users, meta: { total, offset, limit } });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({ data: user });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, role = "USER", active = true } = req.body;

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

  const user = await UserModel.create({ email, password, name, role, active });
  res.status(201).json({ data: user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, role, active, email } = req.body;

  if (email !== undefined && !isValidEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const updated = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(active !== undefined ? { active } : {}),
    },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({ data: updated });
});

export const toggleUserActive = asyncHandler(async (req: Request, res: Response) => {
  const { active } = req.body;
  if (typeof active !== "boolean") {
    throw new ApiError(400, "active must be boolean");
  }

  const updated = await UserModel.findByIdAndUpdate(req.params.id, { active }, { new: true });
  if (!updated) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({ data: updated });
});
