import status from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { DriverServices } from "./driver.service.js";

const getSingleDriver = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DriverServices.getDriverProfile(id);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Driver profile retrieved successfully",
    data: result,
  });
});

const getDriverByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await DriverServices.getDriverProfileByUserId(userId);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Driver profile retrieved successfully",
    data: result,
  });
});

const updateDriver = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DriverServices.updateDriverProfile(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Driver profile updated successfully",
    data: result,
  });
});

export const DriverControllers = {
  getSingleDriver,
  getDriverByUserId,
  updateDriver,
};
