import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/product.controller";
import { authenticate, authorize } from "../middlewares/auth";

const productRouter = Router();

productRouter.get("/", authenticate, listProducts);
productRouter.get("/:id", authenticate, getProductById);
productRouter.post("/", authenticate, authorize("ADMIN"), createProduct);
productRouter.patch("/:id", authenticate, authorize("ADMIN"), updateProduct);
productRouter.delete("/:id", authenticate, authorize("ADMIN"), deleteProduct);

export default productRouter;
