import { ICarsImagesRepository } from "@modules/cars/repositories/interfaces/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImageRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("Car not found");
    }

    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image);
      await this.storageProvider.saveFile(image, "cars");
    });
  }
}
