import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = header.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decode) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req["currentUser"] = decode; // corregido sin espacio
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
