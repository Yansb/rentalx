import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatarFile, userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, "avatar");
    }
    await this.storageProvider.saveFile(avatarFile, "avatar");
    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
