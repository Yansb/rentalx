import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response) {
    const { id: car_id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ images_name, car_id });

    return response.status(201).send();
  }
}
