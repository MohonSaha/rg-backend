import Passenger from "./passenger.model.js";

const getPassengerProfile = async (id) => {
  const result = await Passenger.findById(id).populate("user");
  if (!result) {
    throw new Error("Passenger profile not found");
  }
  return result;
};

const getPassengerProfileByUserId = async (userId) => {
  const result = await Passenger.findOne({ user: userId }).populate("user");
  if (!result) {
    throw new Error("Passenger profile not found");
  }
  return result;
};

const updatePassengerProfile = async (id, payload) => {
  const passenger = await Passenger.findById(id);
  if (!passenger) {
    throw new Error("Passenger profile not found");
  }

  const result = await Passenger.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate("user");

  return result;
};

export const PassengerServices = {
  getPassengerProfile,
  getPassengerProfileByUserId,
  updatePassengerProfile,
};
