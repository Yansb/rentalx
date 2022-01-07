import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(request: Request, response: Response) {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute(request.body);

    return response.status(201).json(car);
  }
}
