import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

export class SendForgotPasswordMailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotPasswordMailUseCase.execute(email);

    return response.status(200).send();
  }
}
