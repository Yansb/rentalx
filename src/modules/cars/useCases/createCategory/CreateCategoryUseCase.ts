import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
