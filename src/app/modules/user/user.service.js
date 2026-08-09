import User from "./user.model.js";
import Passenger from "../passenger/passenger.model.js";
import Driver from "../driver/driver.model.js";

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

export const UserServices = {
  register,
  createManager,
  createDriver,
  createCaptain,
  login,
  getAllUsers,
  updateUser,
};
