import { Router } from "express";
import { Request, Response } from "express";
import authRouter from "./auth.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
