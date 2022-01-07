import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "0e6f1a297006af8f243211b293aabfdd", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
