import { Router } from "express";
import multer from "multer";
import { upload } from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

export const usersRoutes = Router();

const uploadAvatar = multer(upload("./avatar"));

const createUserController = new CreateUserController();
const updateUseAvatarController = new UpdateUserAvatarController();

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUseAvatarController.handle
);

usersRoutes.post("/", createUserController.handle);
