import express from "express";

import logRoutes from "./routes/logRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/v1/log", logRoutes);

app.use(errorHandler);

export default app;
