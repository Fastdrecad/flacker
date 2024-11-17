import chalk from "chalk";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
config();

import keys from "./config/keys.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { configureRoutes } from "./routes/index.js";

const app = express();
const { port } = keys;

app.use(morgan("dev"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure routes
configureRoutes(app);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(chalk.green(`✓ Server is running on port ${chalk.blue(port)}`));
  console.log(chalk.yellow(`🔥 Environment: ${process.env.NODE_ENV}`));
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    chalk.red("Unhandled Rejection at:"),
    promise,
    chalk.red("reason:"),
    reason
  );
});
