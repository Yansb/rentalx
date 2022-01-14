import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token });
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async create(data: ICreateUserTokensDTO): Promise<UserTokens> {
    const newUserToken = this.repository.create(data);

    await this.repository.save(newUserToken);

    return newUserToken;
  }
}
