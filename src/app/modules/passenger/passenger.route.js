import express from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { PassengerControllers } from "./passenger.controller.js";
import { passengerValidations } from "./passenger.validation.js";

const router = express.Router();

router.get("/:id", PassengerControllers.getSinglePassenger);
router.get("/user/:userId", PassengerControllers.getPassengerByUserId);

router.patch(
  "/:id",
  validateRequest(passengerValidations.updatePassengerProfileValidationSchema),
  PassengerControllers.updatePassenger
);

export const PassengerRoutes = router;
