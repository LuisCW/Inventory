import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  active: boolean;
  creationAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, min: 0 },
    active: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: { createdAt: "creationAt", updatedAt: "updatedAt" },
    versionKey: false,
  }
);

export const ProductModel = model<IProduct>("Product", productSchema);
