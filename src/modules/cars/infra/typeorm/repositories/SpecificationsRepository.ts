import { getRepository, ILike, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/interfaces/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationsDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name: ILike(`${name}`),
    });
    return specification;
  }
}