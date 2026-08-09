import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    nid_front: {
      type: String,
      required: false,
    },
    nid_back: {
      type: String,
      required: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    profile_complete: {
      type: Boolean,
      default: false,
    },
    dynamic_attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const Passenger = mongoose.model("Passenger", passengerSchema);

export default Passenger;
