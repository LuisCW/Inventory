import cors from "cors";
import express from "express";
import router from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(errorHandler);
