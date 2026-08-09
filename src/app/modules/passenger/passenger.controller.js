import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { PassengerServices } from "./passenger.service.js";

const getSinglePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PassengerServices.getPassengerProfile(id);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Passenger profile retrieved successfully",
    data: result,
  });
});

const getPassengerByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await PassengerServices.getPassengerProfileByUserId(userId);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Passenger profile retrieved successfully",
    data: result,
  });
});

const updatePassenger = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PassengerServices.updatePassengerProfile(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Passenger profile updated successfully",
    data: result,
  });
});

export const PassengerControllers = {
  getSinglePassenger,
  getPassengerByUserId,
  updatePassenger,
};
