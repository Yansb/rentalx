import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../interfaces/ICarsRepository";
import { ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCategoryDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }
}
