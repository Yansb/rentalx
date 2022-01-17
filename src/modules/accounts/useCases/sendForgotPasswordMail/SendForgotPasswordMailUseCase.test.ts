import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/IUsersTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/DateProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot password email", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "123456789",
      email: "emnojev@raj.gn",
      name: "Emiliano",
      password: "123456",
    });

    await sendForgotPasswordUseCase.execute("emnojev@raj.gn");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordUseCase.execute("john@doe.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );
    await usersRepository.create({
      driver_license: "123456789",
      email: "lip@fuc.bd",
      name: "Emiliano",
      password: "123456",
    });

    await sendForgotPasswordUseCase.execute("lip@fuc.bd");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
