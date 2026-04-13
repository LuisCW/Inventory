import { Router } from "express";
import {
  createUser,
  getUserById,
  listUsers,
  toggleUserActive,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authenticate, authorize("ADMIN"));
userRouter.get("/", listUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.patch("/:id/status", toggleUserActive);

export default userRouter;
