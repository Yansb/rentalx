import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

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
    const { sub: userId } = verify(token, "0e6f1a297006af8f243211b293aabfdd");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId.toString());

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: userId.toString(),
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
