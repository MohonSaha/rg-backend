import User from "./user.model.js";
import Passenger from "../passenger/passenger.model.js";
import Driver from "../driver/driver.model.js";
import Otp from "./otp.model.js";
import { generateOTP, sendOTP } from "../../utils/smsService.js";
import config from "../../config/index.js";

const register = async (userData) => {
  if (await User.isUserExists(userData.whatsapp_number)) {
    throw new Error("User with this WhatsApp number already exists");
  }

  userData.role = "passenger";

  const newUser = await User.create(userData);
  newUser.last_login = new Date();
  await newUser.save();

  // Create an associated passenger profile
  if (newUser && newUser._id) {
    await Passenger.create({
      user: newUser._id,
    });
  }

  return newUser;
};

const createManager = async (userData) => {
  if (await User.isUserExists(userData.whatsapp_number)) {
    throw new Error("User with this WhatsApp number already exists");
  }

  userData.role = "manager";

  const newUser = await User.create(userData);
  return newUser;
};

const createDriver = async (userData) => {
  if (await User.isUserExists(userData.whatsapp_number)) {
    throw new Error("User with this WhatsApp number already exists");
  }

  userData.role = "driver";

  const newUser = await User.create(userData);

  // Create an associated driver profile
  if (newUser && newUser._id) {
    await Driver.create({
      user: newUser._id,
    });
  }

  return newUser;
};

const createCaptain = async (userData) => {
  if (await User.isUserExists(userData.whatsapp_number)) {
    throw new Error("User with this WhatsApp number already exists");
  }

  userData.role = "captain";

  const newUser = await User.create(userData);
  return newUser;
};

const login = async (whatsapp_number, password) => {
  const user = await User.findOne({ whatsapp_number, is_deleted: { $ne: true } }).select(
    "+password"
  );
  if (!user) {
    throw new Error("User with this WhatsApp number does not exist");
  }

  if (!user.is_active) {
    throw new Error("User account is suspended");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new Error("Incorrect password");
  }

  // Update last login
  user.last_login = new Date();
  await user.save();

  return user;
};

const getAllUsers = async (query = {}) => {
  const filter = { is_deleted: { $ne: true } };
  if (query.role) {
    filter.role = query.role;
  }
  const users = await User.find(filter).sort({ createdAt: -1 });
  return users.map((u) => u.toPublicJSON());
};

const updateUser = async (id, updateData) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, is_deleted: { $ne: true } },
    updateData,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!updatedUser) {
    throw new Error("User not found or has been deleted");
  }
  return updatedUser.toPublicJSON();
};

const requestOtp = async (phone) => {
  const otp = generateOTP();
  
  await Otp.findOneAndUpdate(
    { phone },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );
  
  const smsResult = await sendOTP(phone, otp);
  if (!smsResult.success) {
    throw new Error(smsResult.message || "Failed to send OTP message");
  }
  
  const userExists = await User.findOne({ 
    $or: [{ phone }, { whatsapp_number: phone }], 
    is_deleted: { $ne: true } 
  });

  return {
    phone,
    otp: config.alphaSmsApiKey === "dummy_key_until_configured" ? otp : undefined,
    isRegistered: !!userExists,
    message: "OTP sent successfully"
  };
};

const verifyOtp = async (phone, otpCode, full_name) => {
  const record = await Otp.findOne({ phone });
  if (!record) {
    throw new Error("OTP expired or not found. Please request a new one.");
  }
  
  if (record.otp !== otpCode) {
    throw new Error("Invalid OTP code. Please try again.");
  }
  
  await Otp.deleteOne({ _id: record._id });
  
  let user = await User.findOne({ 
    $or: [{ phone }, { whatsapp_number: phone }],
    is_deleted: { $ne: true } 
  });
  
  let isNewUser = false;
  
  if (!user) {
    if (!full_name) {
      throw new Error("USER_NOT_REGISTERED");
    }
    
    isNewUser = true;
    user = await User.create({
      full_name,
      phone,
      whatsapp_number: phone,
      role: "passenger",
      is_profile_completed: true,
      last_login: new Date()
    });
    
    await Passenger.create({
      user: user._id
    });
  } else {
    user.last_login = new Date();
    await user.save();
  }
  
  return {
    user,
    isNewUser
  };
};

const getUserByPhone = async (phone) => {
  const user = await User.findOne({ 
    $or: [{ phone }, { whatsapp_number: phone }],
    is_deleted: { $ne: true } 
  });
  if (!user) {
    throw new Error("User profile not found");
  }
  return user.toPublicJSON();
};

export const UserServices = {
  register,
  createManager,
  createDriver,
  createCaptain,
  login,
  getAllUsers,
  updateUser,
  requestOtp,
  verifyOtp,
  getUserByPhone,
};
