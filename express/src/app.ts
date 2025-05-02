import express from "express";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { AppDataSource } from "./config/ormconfig";
import "reflect-metadata";

const app = express();

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

export default app;
