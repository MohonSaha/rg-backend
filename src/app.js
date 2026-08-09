import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import router from "./app/routes/index.js";

const app = express();

// CORS configuration supporting Vite dev server (http://localhost:5173) and local networks
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// parsers
app.use(express.json());

// application routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "rg-backend server is running successfully!",
    data: null,
  });
});

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
