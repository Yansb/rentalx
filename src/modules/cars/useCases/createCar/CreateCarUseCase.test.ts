import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "test car",
      brand: "test brand",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      category_id: "1",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with repeated license plate", async () => {
    await createCarUseCase.execute({
      name: "name car",
      description: "test car",
      brand: "test brand",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      category_id: "1",
    });
    await expect(
      createCarUseCase.execute({
        name: "name car",
        description: "test car",
        brand: "test brand",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        category_id: "1",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should create a available car by default", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "test car",
      brand: "test brand",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 10,
      category_id: "1",
    });

    expect(car.available).toBe(true);
  });
});
