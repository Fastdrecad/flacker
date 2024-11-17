import chalk from "chalk";
import { Express } from "express";
import { CustomError } from "../utils/CustomError.js";

export const configureRoutes = (app: Express): void => {
  // Health check route
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/test", (req, res) => {
    throw new CustomError("Test Error", 400);
  });

  // Log all routes in development
  if (process.env.NODE_ENV === "development") {
    console.log(chalk.cyan("Registered routes:"));
    app._router.stack
      .filter((r: any) => r.route)
      .forEach((r: any) => {
        console.log(
          chalk.yellow(
            `${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`
          )
        );
      });
  }
};
