import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { getRepository, ILike, Repository } from "typeorm";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate: ILike(`${licensePlate}`),
    });

    return car;
  }
}
