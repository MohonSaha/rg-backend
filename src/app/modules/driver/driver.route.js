import express from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { DriverControllers } from "./driver.controller.js";
import { driverValidations } from "./driver.validation.js";

const router = express.Router();

router.get("/:id", DriverControllers.getSingleDriver);
router.get("/user/:userId", DriverControllers.getDriverByUserId);

router.patch(
  "/:id",
  validateRequest(driverValidations.updateDriverProfileValidationSchema),
  DriverControllers.updateDriver
);

export const DriverRoutes = router;
