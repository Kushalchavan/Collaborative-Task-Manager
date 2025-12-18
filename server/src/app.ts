import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);

// Global Erro handler
app.use(errorHandler);

export default app;
