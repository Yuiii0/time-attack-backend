import { Router } from "express";
import usersController from "./users/users.controller";

const accountsController = Router();

accountsController.use("/users", usersController);

export default accountsController;
