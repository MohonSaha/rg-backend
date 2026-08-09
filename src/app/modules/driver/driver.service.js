import Driver from "./driver.model.js";

const getDriverProfile = async (id) => {
  const result = await Driver.findById(id).populate("user");
  if (!result) {
    throw new Error("Driver profile not found");
  }
  return result;
};

const getDriverProfileByUserId = async (userId) => {
  const result = await Driver.findOne({ user: userId }).populate("user");
  if (!result) {
    throw new Error("Driver profile not found");
  }
  return result;
};

const updateDriverProfile = async (id, payload) => {
  const driver = await Driver.findById(id);
  if (!driver) {
    throw new Error("Driver profile not found");
  }

  const result = await Driver.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  return result;
};

export const DriverServices = {
  getDriverProfile,
  getDriverProfileByUserId,
  updateDriverProfile,
};
