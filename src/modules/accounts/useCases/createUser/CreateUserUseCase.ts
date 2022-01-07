import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "@errors/AppError";
@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(data.password, 8);

    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}
