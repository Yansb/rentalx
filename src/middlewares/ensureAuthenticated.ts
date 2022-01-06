import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = verify(token, "0e6f1a297006af8f243211b293aabfdd");

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId.toString());

    if (!user) {
      throw new Error("User does not exists");
    }
    next();
  } catch {
    throw new Error("Invalid token");
  }
}
