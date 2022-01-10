import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand",
      category_id: "ab82dda7-8071-4a55-87bd-44bbfdfc2e1f",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "ABC-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand test",
      category_id: "ab82dda7-8071-4a55-87bd-44bbfdfc2e1f",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "ABC-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car1 brand test",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car1 description",
      brand: "Car1 brand test",
      category_id: "ab82dda7-8071-4a55-87bd-44bbfdfc2e1f",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "ABC-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      brand: "Car1 brand test",
      category_id: "12345",
      daily_rate: 100,
      fine_amount: 200,
      license_plate: "ABC-1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
