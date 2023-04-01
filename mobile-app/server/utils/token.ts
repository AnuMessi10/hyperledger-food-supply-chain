import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import sanitizedConfig from "../config";

const { JWT_PRIVATE_SECRET, JWT_PUBLIC_SECRET } = sanitizedConfig;

export const createJwtToken = (payload: object) => {
  const token = jwt.sign(payload, JWT_PRIVATE_SECRET!, {
    expiresIn: "2d",
  });
  return token;
};

export const verifyJwtToken = (token: string, next: NextFunction) => {
  try {
    const userId = jwt.verify(token, JWT_PUBLIC_SECRET!);
    return userId;
  } catch (err) {
    next(err);
  }
};
