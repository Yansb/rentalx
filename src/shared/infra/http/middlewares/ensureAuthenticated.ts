import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { secret_token } from "@config/auth";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(token, secret_token);

    request.user = {
      id: userId.toString(),
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
