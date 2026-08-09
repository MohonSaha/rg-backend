import express from "express";
import { UserControllers } from "./user.controller.js";
import { userValidations } from "./user.validation.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.registerUser
);

router.post(
  "/create-manager",
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createManager
);

router.post(
  "/create-driver",
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createDriver
);

router.post(
  "/create-captain",
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createCaptain
);

router.post(
  "/login",
  validateRequest(userValidations.loginUserValidationSchema),
  UserControllers.loginUser
);

router.get("/", UserControllers.getAllUsers);

router.patch(
  "/:id",
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
