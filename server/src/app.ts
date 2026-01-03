import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route";
import userRoute from "./routes/user.route";

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL!, "http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("No Allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/users", userRoute);

// Global Erro handler
app.use(errorHandler);

export default app;
