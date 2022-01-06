import { getRepository, ILike, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email: ILike(`${email}`) });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
}
