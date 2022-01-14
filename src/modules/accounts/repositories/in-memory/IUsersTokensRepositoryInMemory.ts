import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../interfaces/IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, data);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (user) => user.id === user_id && user.refresh_token === refresh_token
    );
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((user) => user.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (user) => user.refresh_token === refresh_token
    );
  }
}
