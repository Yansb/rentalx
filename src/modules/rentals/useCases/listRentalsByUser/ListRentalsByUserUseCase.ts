import { IRentalsRepository } from "@modules/rentals/repositories/interfaces/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string) {
    return await this.rentalsRepository.findByUserId(user_id);
  }
}
