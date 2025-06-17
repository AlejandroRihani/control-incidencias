import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Unhandled error:", error.message);
  res.status(500).json({ message: "Internal Server Error" });
};
