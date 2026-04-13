import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { ProductModel } from "../models/Product";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const offset = Number(req.query.offset || 0);
  const limit = Number(req.query.limit || 10);
  const search = (req.query.search as string) || "";
  const from = req.query.from as string | undefined;
  const to = req.query.to as string | undefined;

  const query: FilterQuery<any> = { active: true };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (from || to) {
    query.creationAt = {};
    if (from) {
      query.creationAt.$gte = new Date(from);
    }
    if (to) {
      query.creationAt.$lte = new Date(to);
    }
  }

  const [total, items] = await Promise.all([
    ProductModel.countDocuments(query),
    ProductModel.find(query)
      .sort({ creationAt: -1 })
      .skip(offset)
      .limit(limit),
  ]);

  res.status(200).json({
    data: items,
    meta: { total, offset, limit },
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductModel.findOne({ _id: req.params.id, active: true });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({ data: product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, price, category, images = [], stock } = req.body;

  if (!title || !description || !category || price === undefined || stock === undefined) {
    throw new ApiError(400, "Missing required product fields");
  }

  if (Number(price) <= 0 || Number(stock) < 0) {
    throw new ApiError(400, "price must be > 0 and stock must be >= 0");
  }

  const created = await ProductModel.create({
    title,
    description,
    price: Number(price),
    category,
    images,
    stock: Number(stock),
    active: true,
  });

  res.status(201).json({ data: created });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  if (payload.price !== undefined && Number(payload.price) <= 0) {
    throw new ApiError(400, "price must be > 0");
  }

  if (payload.stock !== undefined && Number(payload.stock) < 0) {
    throw new ApiError(400, "stock must be >= 0");
  }

  const updated = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      ...payload,
      ...(payload.price !== undefined ? { price: Number(payload.price) } : {}),
      ...(payload.stock !== undefined ? { stock: Number(payload.stock) } : {}),
    },
    { new: true, runValidators: true }
  );

  if (!updated || !updated.active) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({ data: updated });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const updated = await ProductModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!updated) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({ message: "Product marked as inactive" });
});
