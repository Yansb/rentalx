import { inject, injectable } from "tsyringe";
import { deleteFile } from "@utils/file";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatarFile, userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
