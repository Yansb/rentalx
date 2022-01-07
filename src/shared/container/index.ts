import { container } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
