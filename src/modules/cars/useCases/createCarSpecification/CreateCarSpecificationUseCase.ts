import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car not found", 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
