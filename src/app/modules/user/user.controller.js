import catchAsync from "../../utils/catchAsync.js";
import generateToken from "../../utils/generateToken.util.js";
import { getExpiryMs } from "../../utils/getExpiryMs.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const user = await UserServices.register(userData);
  const token = generateToken({
    userId: user._id,
    email: user.email,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: {
      user: user.toPublicJSON(),
      token,
      expiresAt: getExpiryMs(token),
    },
  });
});

const createManager = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createManager(userData);

  sendResponse(res, {
    statusCode: 201,
    message: "Manager created successfully",
    data: result.toPublicJSON(),
  });
});

const createDriver = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createDriver(userData);

  sendResponse(res, {
    statusCode: 201,
    message: "Driver created successfully",
    data: result.toPublicJSON(),
  });
});

const createCaptain = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createCaptain(userData);

  sendResponse(res, {
    statusCode: 201,
    message: "Captain created successfully",
    data: result.toPublicJSON(),
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { whatsapp_number, password } = req.body;
  const user = await UserServices.login(whatsapp_number, password);
  const token = generateToken({
    userId: user._id,
    email: user.email,
  });

  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    data: {
      user: user.toPublicJSON(),
      token,
      expiresAt: getExpiryMs(token),
    },
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    message: "Users retrieved successfully",
    data: users,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const user = await UserServices.updateUser(id, updateData);

  sendResponse(res, {
    statusCode: 200,
    message: "User profile updated successfully",
    data: user,
  });
});

const requestOtp = catchAsync(async (req, res) => {
  const { phone } = req.body;
  const result = await UserServices.requestOtp(phone);

  sendResponse(res, {
    statusCode: 200,
    message: result.message,
    data: {
      phone: result.phone,
      otp: result.otp, // only returned if dummy key
      isRegistered: result.isRegistered,
    },
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { phone, otp, full_name } = req.body;
  const { user, isNewUser } = await UserServices.verifyOtp(phone, otp, full_name);
  
  const token = generateToken({
    userId: user._id,
    email: user.email || "",
    role: user.role,
  });

  sendResponse(res, {
    statusCode: 200,
    message: isNewUser ? "User registered and logged in successfully" : "User logged in successfully",
    data: {
      user: user.toPublicJSON(),
      token,
      expiresAt: getExpiryMs(token),
      isNewUser,
    },
  });
});

export const UserControllers = {
  registerUser,
  createManager,
  createDriver,
  createCaptain,
  loginUser,
  getAllUsers,
  updateUser,
  requestOtp,
  verifyOtp,
};
