import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(24, "hours").toDate();
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car test",
      daily_rate: 100,
      license_plate: "AAA-111",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if theres another rental open to the same user", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car test",
      daily_rate: 100,
      license_plate: "AAA-111",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "12345",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: "1234",
        user_id: "12345",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an open rental"));
  });
  it("Should not be able to create a new rental to an already rented car", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car test",
      daily_rate: 100,
      license_plate: "AAA-111",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123456",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "12345",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car already rented"));
  });
  it("Should not be able to create a new rental with invalid return time", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car test",
      daily_rate: 100,
      license_plate: "AAA-111",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours from now")
    );
  });
});
